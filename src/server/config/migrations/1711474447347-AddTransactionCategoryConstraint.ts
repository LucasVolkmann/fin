import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTransactionCategoryConstraint1711474447347 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION ensure_category_ownership()
      RETURNS TRIGGER AS $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM category c
          WHERE NEW."categoryId" = c.id AND NEW."userId" = c."userId"
        ) THEN
          RAISE EXCEPTION 'The category id must refer to a user category.';
        END IF;

        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER check_category_user
      BEFORE INSERT ON transaction
      FOR EACH ROW
      EXECUTE FUNCTION ensure_category_ownership();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS check_category_user ON transaction;

      DROP FUNCTION IF EXISTS ensure_category_ownership();
    `);
  }

}
