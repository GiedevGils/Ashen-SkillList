using Microsoft.EntityFrameworkCore.Migrations;

namespace SkillListBackEnd.Migrations
{
    public partial class AddCharacters : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAnswers_Users_UserId",
                table: "UserAnswers");

            migrationBuilder.DropIndex(
                name: "IX_UserAnswers_UserId",
                table: "UserAnswers");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UserAnswers");

            migrationBuilder.AddColumn<int>(
                name: "CharacterId",
                table: "UserAnswers",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Character",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Character", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Character_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswers_CharacterId",
                table: "UserAnswers",
                column: "CharacterId");

            migrationBuilder.CreateIndex(
                name: "IX_Character_UserId",
                table: "Character",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAnswers_Character_CharacterId",
                table: "UserAnswers",
                column: "CharacterId",
                principalTable: "Character",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAnswers_Character_CharacterId",
                table: "UserAnswers");

            migrationBuilder.DropTable(
                name: "Character");

            migrationBuilder.DropIndex(
                name: "IX_UserAnswers_CharacterId",
                table: "UserAnswers");

            migrationBuilder.DropColumn(
                name: "CharacterId",
                table: "UserAnswers");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "UserAnswers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswers_UserId",
                table: "UserAnswers",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAnswers_Users_UserId",
                table: "UserAnswers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
