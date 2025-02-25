import requests
import os
from dotenv import load_dotenv

# 환경 변수
load_dotenv()

APP_KEY = os.getenv("APP_KEY")
APP_SECRET = os.getenv("APP_SECRET")
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")


def get_daily_price(stock_code: str, start_date: str, end_date: str) -> list:
    headers = {
        "content-type": "application/json",
        "authorization": f"Bearer {ACCESS_TOKEN}",
        "appkey": APP_KEY,
        "appsecret": APP_SECRET,
        "tr_id": TR_ID,
    }

    params = {
        "FID_COND_MRKT_DIV_CODE": "J",
        "FID_INPUT_ISCD": stock_code,
        "FID_INPUT_DATE_1": start_date,
        "FID_INPUT_DATE_2": end_date,
        "FID_PERIOD_DIV_CODE": "D",
        "FID_ORG_ADJ_PRC": "0",
    }

    response = requests.get(f"{DOMAIN}{URL}", headers=headers, params=params)

    if response.status_code == 200:
        return response.json().get("output2", [])
    else:
        print(f"Error {response.status_code}: {response.text}")
        return []


def generate_insert_sql(stock_code: str, data: list) -> list:
    result = []

    for record in data:
        if not record:
            continue

        date = record["stck_bsop_date"]
        open_price = record["stck_oprc"]
        close_price = record["stck_clpr"]
        high_price = record["stck_hgpr"]
        low_price = record["stck_lwpr"]
        volume = record["acml_vol"]

        query = f"INSERT INTO {TABLE_NAME} (date, ticker_id, open_price, closed_price, high_price, low_price, volume, create_timestamp, update_timestamp)\n"
        query += f"VALUES (TO_DATE('{date}', 'YYYYMMDD'), '{stock_code}', {open_price}, {close_price}, {high_price}, {low_price}, {volume}, SYSTIMESTAMP, SYSTIMESTAMP);\n"
        result.append(query)
    return result


if __name__ == "__main__":
    import KOSPI200
    import time

    # API 설정 정보
    DOMAIN = "https://openapi.koreainvestment.com:9443"
    URL = "/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice"
    TR_ID = "FHKST03010100"

    START_DATE = "20250101"
    END_DATE = "20250131"

    # SQL 테이블명
    TABLE_NAME = "ticker_price_histories"

    all_sql_statements = []
    for STOCK_CODE in KOSPI200.kospi_200.keys():
        print(f"종목 코드: {STOCK_CODE}")
        stock_data = get_daily_price(STOCK_CODE, START_DATE, END_DATE)
        if stock_data:
            sql_statements = generate_insert_sql(STOCK_CODE, stock_data)
            all_sql_statements.extend(sql_statements)

        time.sleep(0.5)

    # SQL 파일 저장
    sql_file_path = "./25년01월_시세.sql"
    with open(sql_file_path, 'w', encoding='utf-8') as sql_file:
        for sql in all_sql_statements:
            sql_file.write(sql + "\n")
