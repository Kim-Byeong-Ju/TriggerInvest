from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = Flask(__name__)

# KoSentenceBERT 모델 로드
model = SentenceTransformer('snunlp/KR-SBERT-V40K-klueNLI-augSTS')

@app.route('/get_top_tickers', methods=['POST'])
def get_top_tickers():
    data = request.json
    word_list = data.get('wordList', [])  # 사용자 키워드 리스트
    print(word_list)
    ticker_list = data.get('tickerList', [])  # 기업 설명 리스트

    if not word_list or not ticker_list:
        return jsonify({'error': 'wordList 또는 tickerList가 비어 있습니다'}), 400

    # 모든 키워드 벡터화
    word_vectors = model.encode(word_list)

    # 모든 기업 설명 벡터화
    ticker_vectors = model.encode([ticker["description"] for ticker in ticker_list])

    # 모든 키워드 벡터와 기업 설명 벡터 간의 유사도 평균 계산
    similarity_scores = []
    for i, ticker_vector in enumerate(ticker_vectors):
        similarities = cosine_similarity([ticker_vector], word_vectors)  # 각 기업 설명 vs 모든 키워드
        avg_similarity = np.mean(similarities)  # 평균 유사도
        similarity_scores.append((ticker_list[i], avg_similarity))

    # 유사도가 높은 상위 10개 기업 정렬 후 선택
    top_10_tickers = sorted(similarity_scores, key=lambda x: x[1], reverse=True)[:10]
    
    # JSON 응답 반환
    return jsonify([
    {"tickerName": t[0]['tickerName'], "description": t[0]['description'], 
     "tickerId": t[0]['tickerId'], "industryGroupName": t[0]['industryGroupName'], 
     "similarity": float(t[1])} for t in top_10_tickers
    ])


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
