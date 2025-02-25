import INDUSTRIES


def main():
    sql_statements = []

    for industry_group_id, name in INDUSTRIES.industry_codes.items():
        sql = f"INSERT INTO industry_groups (industry_group_id, name, create_timestamp, update_timestamp)\n"
        sql += f"VALUES ({industry_group_id}, '{name}', SYSTIMESTAMP, SYSTIMESTAMP);\n"
        sql_statements.append(sql)

    # SQL 파일 저장
    sql_file_path = "./industry_groups.sql"

    with open(sql_file_path, 'w', encoding='utf-8') as sql_file:
        for sql in sql_statements:
            sql_file.write(sql + "\n")


if __name__ == "__main__":
    main()