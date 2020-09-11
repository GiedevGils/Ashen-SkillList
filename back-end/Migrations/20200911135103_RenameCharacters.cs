using Microsoft.EntityFrameworkCore.Migrations;

namespace SkillListBackEnd.Migrations
{
    public partial class RenameCharacters : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Character_Users_UserId",
                table: "Character");

            migrationBuilder.DropForeignKey(
                name: "FK_UserAnswers_Character_CharacterId",
                table: "UserAnswers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Character",
                table: "Character");

            migrationBuilder.RenameTable(
                name: "Character",
                newName: "Characters");

            migrationBuilder.RenameIndex(
                name: "IX_Character_UserId",
                table: "Characters",
                newName: "IX_Characters_UserId");

            migrationBuilder.AddColumn<string>(
                name: "CharacterName",
                table: "Characters",
                maxLength: 30,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Squad",
                table: "Characters",
                maxLength: 15,
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Characters",
                table: "Characters",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Characters_Users_UserId",
                table: "Characters",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserAnswers_Characters_CharacterId",
                table: "UserAnswers",
                column: "CharacterId",
                principalTable: "Characters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Characters_Users_UserId",
                table: "Characters");

            migrationBuilder.DropForeignKey(
                name: "FK_UserAnswers_Characters_CharacterId",
                table: "UserAnswers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Characters",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "CharacterName",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "Squad",
                table: "Characters");

            migrationBuilder.RenameTable(
                name: "Characters",
                newName: "Character");

            migrationBuilder.RenameIndex(
                name: "IX_Characters_UserId",
                table: "Character",
                newName: "IX_Character_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Character",
                table: "Character",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Character_Users_UserId",
                table: "Character",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserAnswers_Character_CharacterId",
                table: "UserAnswers",
                column: "CharacterId",
                principalTable: "Character",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
