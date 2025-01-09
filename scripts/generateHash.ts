const bcrypt = require('bcryptjs');

async function generateAndVerifyHash() {
  const password = 'default';

  // Generate hash
  const hashedPassword = await bcrypt.hash(password, 10);
  const base64Hash = Buffer.from(hashedPassword).toString('base64');

  console.log('Generated hash:', hashedPassword);
  console.log('Base64 encoded:', base64Hash);

  // Verify hash
  const decodedHash = Buffer.from(base64Hash, 'base64').toString();
  const isValid = await bcrypt.compare(password, decodedHash);
  console.log('Verification:', isValid);

  return base64Hash;
}

generateAndVerifyHash().then((hash) => {
  console.log('\nAdd this to your .env.local:');
  console.log(`NEXT_PUBLIC_ADMIN_PASSWORD=${hash}`);
});
