using Microsoft.EntityFrameworkCore.Migrations;

namespace SkillListBackEnd.Migrations
{
    public partial class UniqueName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CharacterAnswer_Answers_AnswerId",
                table: "CharacterAnswer");

            migrationBuilder.DropForeignKey(
                name: "FK_CharacterAnswer_Characters_CharacterId",
                table: "CharacterAnswer");

            migrationBuilder.DropForeignKey(
                name: "FK_CharacterAnswer_Questions_QuestionId",
                table: "CharacterAnswer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CharacterAnswer",
                table: "CharacterAnswer");

            migrationBuilder.RenameTable(
                name: "CharacterAnswer",
                newName: "CharacterAnswers");

            migrationBuilder.RenameIndex(
                name: "IX_CharacterAnswer_QuestionId",
                table: "CharacterAnswers",
                newName: "IX_CharacterAnswers_QuestionId");

            migrationBuilder.RenameIndex(
                name: "IX_CharacterAnswer_CharacterId",
                table: "CharacterAnswers",
                newName: "IX_CharacterAnswers_CharacterId");

            migrationBuilder.RenameIndex(
                name: "IX_CharacterAnswer_AnswerId",
                table: "CharacterAnswers",
                newName: "IX_CharacterAnswers_AnswerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CharacterAnswers",
                table: "CharacterAnswers",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Name",
                table: "Users",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_CharacterAnswers_Answers_AnswerId",
                table: "CharacterAnswers",
                column: "AnswerId",
                principalTable: "Answers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CharacterAnswers_Characters_CharacterId",
                table: "CharacterAnswers",
                column: "CharacterId",
                principalTable: "Characters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CharacterAnswers_Questions_QuestionId",
                table: "CharacterAnswers",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CharacterAnswers_Answers_AnswerId",
                table: "CharacterAnswers");

            migrationBuilder.DropForeignKey(
                name: "FK_CharacterAnswers_Characters_CharacterId",
                table: "CharacterAnswers");

            migrationBuilder.DropForeignKey(
                name: "FK_CharacterAnswers_Questions_QuestionId",
                table: "CharacterAnswers");

            migrationBuilder.DropIndex(
                name: "IX_Users_Name",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CharacterAnswers",
                table: "CharacterAnswers");

            migrationBuilder.RenameTable(
                name: "CharacterAnswers",
                newName: "CharacterAnswer");

            migrationBuilder.RenameIndex(
                name: "IX_CharacterAnswers_QuestionId",
                table: "CharacterAnswer",
                newName: "IX_CharacterAnswer_QuestionId");

            migrationBuilder.RenameIndex(
                name: "IX_CharacterAnswers_CharacterId",
                table: "CharacterAnswer",
                newName: "IX_CharacterAnswer_CharacterId");

            migrationBuilder.RenameIndex(
                name: "IX_CharacterAnswers_AnswerId",
                table: "CharacterAnswer",
                newName: "IX_CharacterAnswer_AnswerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CharacterAnswer",
                table: "CharacterAnswer",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CharacterAnswer_Answers_AnswerId",
                table: "CharacterAnswer",
                column: "AnswerId",
                principalTable: "Answers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CharacterAnswer_Characters_CharacterId",
                table: "CharacterAnswer",
                column: "CharacterId",
                principalTable: "Characters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CharacterAnswer_Questions_QuestionId",
                table: "CharacterAnswer",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
