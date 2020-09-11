using System;
using System.Security.Cryptography;

namespace SkillListBackEnd.Helpers
{
    /// <summary>
    /// Generate a new code for a user login.
    /// This is based on the RNGCryptoServiceProvider example given by Microsoft, found here:
    /// https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.rngcryptoserviceprovider?view=netcore-3.1
    /// </summary>
    public static class LoginCodeHelper
    {
        private static RNGCryptoServiceProvider rngCsp = new RNGCryptoServiceProvider();

        private readonly static string[] potentialCharacters = { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" };
        private const int codeLength = 6;

        /// <summary>
        /// Generate a code for the user.
        /// </summary>
        /// <returns>A 6 digit code</returns>
        public static string GenerateCode()
        {
            string code = "";

            for (int x = 0; x < codeLength; x++)
            {
                int number = GenerateRandomNumber((byte)potentialCharacters.Length);
                code += potentialCharacters[number - 1];
            }

            rngCsp.Dispose();
            return code;
        }

        private static int GenerateRandomNumber(byte between)
        {
            if (between <= 0)
            {
                throw new ArgumentOutOfRangeException("generate number - between");
            }

            // Create a byte to hold the random value
            byte[] number = new byte[1];

            do
            {
                rngCsp.GetBytes(number);
            }
            while (!IsValidNumber(number[0], between));

            return (byte)((number[0] % between) + 1);
        }

        private static bool IsValidNumber(byte number, byte between)
        {
            int fullSet = Byte.MaxValue / between;

            return number < between * fullSet;
        }
    }
}
