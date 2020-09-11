using Microsoft.EntityFrameworkCore.Migrations;

namespace SkillListBackEnd.Migrations
{
    public partial class ChangeCategoryRelations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "QuestionCategoryId",
                table: "Questions",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Categories",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Questions_QuestionCategoryId",
                table: "Questions",
                column: "QuestionCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Categories_QuestionCategoryId",
                table: "Questions",
                column: "QuestionCategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Categories_QuestionCategoryId",
                table: "Questions");

            migrationBuilder.DropIndex(
                name: "IX_Questions_QuestionCategoryId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "QuestionCategoryId",
                table: "Questions");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Categories",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 50,
                oldNullable: true);
        }
    }
}
