import CryptoJS from 'crypto-js';
import * as yaml from 'js-yaml';
import Papa from 'papaparse';
import { faker } from '@faker-js/faker';

export interface DevToolItem {
  id: string;
  name: string;
  category: 'json-code' | 'hash-crypto' | 'converters' | 'generators';
  description: string;
  icon?: string;
  tags?: string[];
}

export const ALL_DEV_PRO_TOOLS: DevToolItem[] = [
  // JSON & CODE (30 Tools)
  { id: 'json-formatter', name: 'JSON Formatter & Validator', category: 'json-code', description: 'Beautify with 2/4 spaces or minify JSON, with exact line number error reporting and tree inspection.' },
  { id: 'json-to-yaml', name: 'JSON to YAML Converter', category: 'json-code', description: 'Convert structured JSON documents to clean YAML specifications.' },
  { id: 'yaml-to-json', name: 'YAML to JSON Converter', category: 'json-code', description: 'Parse YAML documents into standard validated JSON.' },
  { id: 'json-to-csv', name: 'JSON to CSV Converter', category: 'json-code', description: 'Flatten and export JSON array of objects to RFC-4180 compliant CSV.' },
  { id: 'csv-to-json', name: 'CSV to JSON Converter', category: 'json-code', description: 'Parse tabular CSV text into clean JSON arrays with type detection.' },
  { id: 'xml-formatter', name: 'XML Formatter & Prettifier', category: 'json-code', description: 'Format and indent unformatted XML documents with syntax tree validation.' },
  { id: 'xml-to-json', name: 'XML to JSON Converter', category: 'json-code', description: 'Convert XML tags and attributes into structured JSON objects.' },
  { id: 'html-formatter', name: 'HTML Prettifier & Beautifier', category: 'json-code', description: 'Format and indent messy HTML code with proper tag nesting.' },
  { id: 'html-minifier', name: 'HTML Minifier', category: 'json-code', description: 'Strip comments, collapse whitespace, and compress HTML for production.' },
  { id: 'css-beautifier', name: 'CSS Formatter & Beautifier', category: 'json-code', description: 'Clean up CSS stylesheets with consistent bracket formatting and indentation.' },
  { id: 'css-minifier', name: 'CSS Minifier', category: 'json-code', description: 'Compress CSS stylesheets by stripping comments, spaces, and line breaks.' },
  { id: 'js-minifier', name: 'JavaScript Minifier & Compressor', category: 'json-code', description: 'Compress JS code, strip comments and unnecessary tokens safely.' },
  { id: 'sql-formatter', name: 'SQL Query Formatter', category: 'json-code', description: 'Prettify SQL queries (SELECT, INSERT, UPDATE, JOINs) with standard dialect rules.' },
  { id: 'base64-encode-decode', name: 'Base64 Text Encoder / Decoder', category: 'json-code', description: 'Encode & decode text to Base64 with full UTF-8 Unicode character support.' },
  { id: 'url-encoder-decoder', name: 'URL / URI Encoder & Decoder', category: 'json-code', description: 'Encode unsafe characters to percent-encoding (%20) and decode back to UTF-8.' },
  { id: 'html-entity-encoder', name: 'HTML Entity Encoder & Decoder', category: 'json-code', description: 'Convert characters like <, >, &, quotes into &lt;, &gt;, &#38; and vice-versa.' },
  { id: 'jwt-debugger', name: 'JWT Token Decoder & Inspector', category: 'json-code', description: 'Decode JSON Web Tokens (Header, Payload, Signature) with expiration checking.' },
  { id: 'markdown-to-html', name: 'Markdown to HTML Live Converter', category: 'json-code', description: 'Convert GitHub Flavored Markdown (headings, lists, tables) into clean HTML.' },
  { id: 'diff-checker', name: 'Code & Text Diff Checker', category: 'json-code', description: 'Compare two snippets line-by-line to detect additions, deletions, and edits.' },
  { id: 'regex-tester-pro', name: 'Regex Tester & Matcher', category: 'json-code', description: 'Real-time JavaScript regular expression matcher with flags (g, i, m, s).' },
  { id: 'cron-expression-parser', name: 'Cron Expression Parser & Humanizer', category: 'json-code', description: 'Parse 5-field cron strings (* * * * *) into plain English human schedules.' },
  { id: 'curl-to-fetch', name: 'cURL Command to JS Fetch / Axios', category: 'json-code', description: 'Convert terminal cURL requests into browser fetch() and Axios code snippets.' },
  { id: 'javascript-obfuscator', name: 'JS Code Obfuscator & Hex Encoder', category: 'json-code', description: 'Encode JS variables and strings into hex/char code arrays for basic masking.' },
  { id: 'escape-unescape-string', name: 'String Escape & Unescape', category: 'json-code', description: 'Escape strings for JSON, JavaScript, Java, C#, or SQL string literals.' },
  { id: 'graphql-prettifier', name: 'GraphQL Query Prettifier', category: 'json-code', description: 'Format and indent GraphQL queries, mutations, and fragments.' },
  { id: 'json-schema-generator', name: 'JSON to JSON Schema Generator', category: 'json-code', description: 'Infer draft-07 JSON Schema definition from any sample JSON payload.' },
  { id: 'json-path-tester', name: 'JSONPath Expression Evaluator', category: 'json-code', description: 'Query and extract nested fields from JSON using JSONPath dot-notation.' },
  { id: 'postman-to-openapi', name: 'Postman Collection to OpenAPI/Swagger', category: 'json-code', description: 'Convert Postman v2.1 collection JSON into OpenAPI 3.0 YAML/JSON.' },
  { id: 'htaccess-to-nginx', name: '.htaccess to Nginx Rewrite Converter', category: 'json-code', description: 'Convert Apache RewriteRules into Nginx location and rewrite directives.' },
  { id: 'dockerfile-validator', name: 'Dockerfile Validator & Linter', category: 'json-code', description: 'Validate Dockerfile directives (FROM, RUN, CMD, EXPOSE) for best practices.' },

  // HASH & CRYPTO (15 Tools)
  { id: 'all-hash-generator', name: 'Multi-Hash Generator (MD5, SHA1, SHA256, SHA512)', category: 'hash-crypto', description: 'Compute MD5, SHA-1, SHA-224, SHA-256, SHA-384, SHA-512, RIPEMD160 all at once.' },
  { id: 'md5-hash', name: 'MD5 Hash Generator & Checksum', category: 'hash-crypto', description: 'Compute 128-bit MD5 message digest hash string from any text.' },
  { id: 'sha256-hash', name: 'SHA-256 Hash Generator', category: 'hash-crypto', description: 'Industry-standard 256-bit cryptographic SHA-2 hash calculator.' },
  { id: 'sha512-hash', name: 'SHA-512 Hash Calculator', category: 'hash-crypto', description: 'High-security 512-bit SHA-2 cryptographic digest generator.' },
  { id: 'hmac-generator', name: 'HMAC Generator (SHA-256, MD5)', category: 'hash-crypto', description: 'Generate Keyed-Hash Message Authentication Code using secret keys.' },
  { id: 'uuid-v4-generator', name: 'UUID / GUID v4 Batch Generator', category: 'hash-crypto', description: 'Generate cryptographically strong RFC 4122 v4 UUIDs via crypto.randomUUID().' },
  { id: 'nanoid-generator', name: 'NanoID Compact ID Generator', category: 'hash-crypto', description: 'Generate URL-friendly 21-character unique string identifiers.' },
  { id: 'password-generator-pro', name: 'Secure Password Generator & Entropy', category: 'hash-crypto', description: 'Cryptographically random password generator with uppercase, numbers, symbols & entropy score.' },
  { id: 'passphrase-generator', name: 'Memorable Passphrase Generator', category: 'hash-crypto', description: 'Generate Diceware-style memorable multi-word passphrases with separators.' },
  { id: 'bcrypt-hash-tester', name: 'Bcrypt Hash Generator & Verifier', category: 'hash-crypto', description: 'Simulate salted Bcrypt password hashing with adjustable work factor / cost.' },
  { id: 'aes-encryption', name: 'AES-256 Text Encryptor & Decryptor', category: 'hash-crypto', description: 'Encrypt and decrypt sensitive text using AES-256-CBC and passphrase.' },
  { id: 'rot13-cipher', name: 'ROT13 & Caesar Cipher Encoder', category: 'hash-crypto', description: 'Encode & decode text by rotating characters through 13 alphabetical positions.' },
  { id: 'morse-code-translator', name: 'Morse Code Encoder & Audio Beeper', category: 'hash-crypto', description: 'Convert text to international Morse code dots and dashes with playback.' },
  { id: 'crc32-checksum', name: 'CRC32 Checksum Calculator', category: 'hash-crypto', description: 'Compute standard 32-bit Cyclic Redundancy Check checksum.' },
  { id: 'sha3-keccak-hash', name: 'SHA-3 / Keccak-256 Hash Generator', category: 'hash-crypto', description: 'Calculate Ethereum-compatible Keccak-256 and standard SHA-3 hashes.' },

  // CONVERTERS & FORMATTERS (25 Tools)
  { id: 'number-base-converter', name: 'Number Base Converter (Bin, Oct, Dec, Hex)', category: 'converters', description: 'Convert numbers across Binary (Base 2), Octal (Base 8), Decimal (Base 10), and Hex (Base 16).' },
  { id: 'color-converter-pro', name: 'Color Space Converter (HEX, RGB, HSL, CMYK)', category: 'converters', description: 'Convert between HEX, RGB, HSL, and 4-channel CMYK printing color spaces with visual picker.' },
  { id: 'unix-timestamp-converter', name: 'Unix Epoch Timestamp to Human Date', category: 'converters', description: 'Convert milliseconds & seconds timestamps to UTC and local date formats with live clock.' },
  { id: 'text-case-converter', name: 'Text Case Converter (camelCase, snake_case, UPPER)', category: 'converters', description: 'Convert text to lowercase, UPPERCASE, Title Case, camelCase, snake_case, kebab-case, CONSTANT_CASE.' },
  { id: 'ascii-to-binary-text', name: 'ASCII Text to Binary String Converter', category: 'converters', description: 'Convert letters to 8-bit binary bytes (01100001) and decode back to text.' },
  { id: 'hex-to-ascii-string', name: 'Hexadecimal to ASCII Text Converter', category: 'converters', description: 'Convert raw hex byte strings (48 65 6c 6c 6f) to readable text.' },
  { id: 'rgb-to-hex-color', name: 'RGB to HEX & CSS RGBA Converter', category: 'converters', description: 'Calculate 6-digit and 8-digit hexadecimal color codes with alpha transparency.' },
  { id: 'hex-to-rgb-color', name: 'HEX to RGB Color Converter', category: 'converters', description: 'Parse #3b82f6 into red: 59, green: 130, blue: 246 integer channels.' },
  { id: 'binary-to-decimal', name: 'Binary to Decimal & Hex Converter', category: 'converters', description: 'Convert binary strings (101010) into decimal integer 42 and hex 0x2A.' },
  { id: 'decimal-to-binary', name: 'Decimal to Binary Converter', category: 'converters', description: 'Convert standard numbers into padded binary bits with two’s complement option.' },
  { id: 'octal-converter', name: 'Octal to Decimal / Hex Converter', category: 'converters', description: 'Convert base-8 octal numerals to decimal and hex.' },
  { id: 'chmod-permissions-calculator', name: 'Linux Chmod Permissions Calculator (755, 644)', category: 'converters', description: 'Interactive chmod visual grid to compute octal codes (777, 755, 644) and rwxr-xr-x strings.' },
  { id: 'byte-size-converter', name: 'Digital Storage & Byte Size Converter (KB, MB, GB, TB)', category: 'converters', description: 'Convert data units between Bytes, KB, KiB, MB, MiB, GB, and TB (1000 vs 1024 base).' },
  { id: 'slug-generator', name: 'URL Slug & Permalink Generator', category: 'converters', description: 'Transform article headlines into clean, URL-safe SEO kebab-case slugs.' },
  { id: 'string-length-counter', name: 'Word, Character, Line & Byte Counter', category: 'converters', description: 'Detailed text analysis: words, characters without spaces, paragraphs, reading time.' },
  { id: 'duplicate-line-remover', name: 'Duplicate Line Remover & Sorter', category: 'converters', description: 'Remove duplicate lines from text or code lists, with case-sensitivity and sorting.' },
  { id: 'whitespace-remover', name: 'Whitespace & Blank Line Cleaner', category: 'converters', description: 'Remove trailing whitespace, multiple blank lines, and tabs from source text.' },
  { id: 'line-break-converter', name: 'Line Break Converter (CRLF to LF)', category: 'converters', description: 'Convert Windows \\r\\n line endings to Unix \\n and vice-versa.' },
  { id: 'list-to-array-converter', name: 'List to JSON / SQL Array Converter', category: 'converters', description: 'Convert multiline text lists into JSON arrays ["a", "b"] or SQL IN (\'a\', \'b\') clauses.' },
  { id: 'lorem-ipsum-generator', name: 'Lorem Ipsum Dummy Text Generator', category: 'converters', description: 'Generate customizable placeholder paragraphs, sentences, and words.' },
  { id: 'string-obfuscator', name: 'String Inverter & Text Reverser', category: 'converters', description: 'Reverse entire text strings, words, or invert letter capitalization.' },
  { id: 'punycode-converter', name: 'Punycode IDN Domain Converter', category: 'converters', description: 'Convert international Unicode domain names (xn--) to ASCII Punycode.' },
  { id: 'user-agent-parser', name: 'Browser User-Agent String Parser', category: 'converters', description: 'Extract Browser engine, OS version, device model from navigator.userAgent.' },
  { id: 'cidr-subnet-calculator', name: 'IPv4 CIDR Subnet Calculator & Netmask', category: 'converters', description: 'Calculate IP ranges, broadcast address, netmask, and usable hosts from /24 CIDR.' },
  { id: 'mac-address-generator', name: 'MAC Address Generator & Formatter', category: 'converters', description: 'Generate random valid unicast MAC addresses with colon, hyphen, or dot delimiters.' },

  // FAKE DATA & GENERATORS (30 Tools)
  { id: 'fake-user-profile-gen', name: 'Complete Fake User Profile Generator', category: 'generators', description: 'Generate comprehensive test user accounts with name, gender, email, phone, bio, avatar.' },
  { id: 'fake-indian-data-gen', name: 'Indian Fake Identity Generator (Aadhaar/PAN/Phone)', category: 'generators', description: 'Realistic Indian test data: +91 phone numbers, PAN format (ABCDE1234F), 12-digit Aadhaar test numbers, states & pincodes.' },
  { id: 'luhn-credit-card-gen', name: 'Luhn-Valid Test Credit Card Generator', category: 'generators', description: 'Generate mathematically valid test Visa, MasterCard, Amex, Discover, RuPay cards passing Luhn mod 10 checks.' },
  { id: 'fake-address-generator', name: 'Realistic Global & Indian Address Generator', category: 'generators', description: 'Generate formatted streets, cities, postal zip codes, states, and coordinates.' },
  { id: 'fake-company-generator', name: 'Fake Company & Business Data Generator', category: 'generators', description: 'Generate corporate business names, catchphrases, BS buzzwords, industries, and tax IDs.' },
  { id: 'fake-email-generator', name: 'Fake Disposable Email Address Generator', category: 'generators', description: 'Generate realistic email addresses across common test domains (example.com, testmail.dev).' },
  { id: 'iban-bank-generator', name: 'Test IBAN & BIC/SWIFT Number Generator', category: 'generators', description: 'Generate syntactically valid European and global IBAN numbers with country check digits.' },
  { id: 'indian-ifsc-generator', name: 'Indian Bank IFSC & Account Generator', category: 'generators', description: 'Generate valid IFSC codes (HDFC0001234, SBIN0004567) and 12-16 digit test account numbers.' },
  { id: 'upi-id-generator', name: 'UPI ID & VPA Handle Generator', category: 'generators', description: 'Generate test Virtual Payment Addresses (@okaxis, @okhdfcbank, @paytm, @ybl).' },
  { id: 'wifi-qr-code-gen', name: 'WiFi Network Connection QR Code Generator', category: 'generators', description: 'Generate instant scan-to-connect WiFi QR codes formatted as WIFI:T:WPA;S:ssid;P:pass;;.' },
  { id: 'vcard-qr-generator', name: 'vCard 3.0 Contact QR Code Generator', category: 'generators', description: 'Generate scannable vCard QR codes for smartphone address book import.' },
  { id: 'barcode-code128-gen', name: 'Barcode Generator (Code 128, EAN-13, UPC-A)', category: 'generators', description: 'Render real scan-ready Barcode graphics using JsBarcode SVG/Canvas.' },
  { id: 'random-phone-generator', name: 'International Test Phone Number Generator', category: 'generators', description: 'Generate validly formatted test numbers for US (+1), UK (+44), India (+91), Germany (+49).' },
  { id: 'mock-rest-json-generator', name: 'Mock REST API JSON Array Generator', category: 'generators', description: 'Generate customizable arrays of 5-100 realistic mock objects with IDs, timestamps, and nested records.' },
  { id: 'random-string-token-gen', name: 'Random Alpha-Numeric Token Generator', category: 'generators', description: 'Generate high-entropy alphanumeric API keys, secrets, and session tokens.' },
  { id: 'fake-credit-card-validator', name: 'Credit Card Number Luhn Validator', category: 'generators', description: 'Verify any card number against Luhn Modulo 10 algorithm and detect issuing network.' },
  { id: 'indian-pan-validator', name: 'Indian PAN & GSTIN Format Validator', category: 'generators', description: 'Validate 10-digit PAN (5 letters, 4 numbers, 1 letter) and 15-digit GSTIN tax IDs.' },
  { id: 'fake-product-catalog-gen', name: 'Fake E-Commerce Product Catalog Generator', category: 'generators', description: 'Generate product catalogs with titles, SKU, price, stock, category, rating, and description.' },
  { id: 'fake-transaction-generator', name: 'Fake Financial Transactions Generator', category: 'generators', description: 'Generate banking ledger transactions: timestamps, merchants, amounts, debit/credit flags.' },
  { id: 'test-ipv4-generator', name: 'Random Test IP Address & Port Generator', category: 'generators', description: 'Generate random public and private subnet IPv4 addresses and port numbers.' },
  { id: 'svg-placeholder-generator', name: 'SVG Dynamic Placeholder Image Generator', category: 'generators', description: 'Generate customizable dimensioned placeholder SVG banner graphics with custom text and colors.' },
  { id: 'color-palette-generator', name: 'Harmonious Color Palette Generator', category: 'generators', description: 'Generate aesthetic 5-shade color palettes (monochromatic, complementary, triadic) with hex codes.' },
  { id: 'random-date-range-gen', name: 'Random Date & Timestamp Range Generator', category: 'generators', description: 'Generate randomized ISO-8601 date sequences within custom start and end bounds.' },
  { id: 'indian-pincode-lookup-gen', name: 'Indian Postal Pincode & City Database', category: 'generators', description: 'Lookup & generate major Indian metropolitan pincodes (110001, 400001, 560001, etc.).' },
  { id: 'fake-car-vin-generator', name: 'Vehicle Identification Number (VIN) Generator', category: 'generators', description: 'Generate 17-character ISO 3779 compliant test Vehicle Identification Numbers.' },
  { id: 'fake-passport-generator', name: 'Sample Test Passport & ID Number Generator', category: 'generators', description: 'Generate sample international passport numbers formatted for form testing.' },
  { id: 'json-api-payload-mock', name: 'JSON:API Standard Response Generator', category: 'generators', description: 'Generate compliant JSON:API spec responses with { data, included, meta, links }.' },
  { id: 'braille-text-generator', name: 'English to Braille Character Generator', category: 'generators', description: 'Convert standard English letters into 6-dot Unicode Braille characters (⠓⠑⠇⠇⠕).' },
  { id: 'zalgo-glitch-text-gen', name: 'Zalgo Glitched Text Generator', category: 'generators', description: 'Generate cursed/glitched Unicode combining diacritics text for testing string limits.' },
  { id: 'jwt-mock-token-generator', name: 'Mock JWT Token Generator', category: 'generators', description: 'Generate unsigned or HS256 signed mock JWT tokens for development and auth stubs.' }
];

// REAL LUHN ALGORITHM GENERATOR
export function generateLuhnCard(type: 'visa' | 'mastercard' | 'amex' | 'discover' | 'rupay' = 'visa'): {
  cardNumber: string;
  type: string;
  cvv: string;
  expiry: string;
  holderName: string;
  isValidLuhn: boolean;
} {
  let prefix = '4';
  let length = 16;

  if (type === 'mastercard') {
    prefix = '5' + (Math.floor(Math.random() * 5) + 1).toString(); // 51-55
    length = 16;
  } else if (type === 'amex') {
    prefix = Math.random() > 0.5 ? '34' : '37';
    length = 15;
  } else if (type === 'discover') {
    prefix = '6011';
    length = 16;
  } else if (type === 'rupay') {
    prefix = Math.random() > 0.5 ? '60' : '65';
    length = 16;
  }

  let card = prefix;
  while (card.length < length - 1) {
    card += Math.floor(Math.random() * 10).toString();
  }

  // Calculate check digit
  let sum = 0;
  for (let i = 0; i < card.length; i++) {
    let digit = parseInt(card[card.length - 1 - i], 10);
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  const fullNumber = card + checkDigit.toString();

  // Expiry in future (1-5 years)
  const now = new Date();
  const expMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const expYear = String((now.getFullYear() % 100) + Math.floor(Math.random() * 5) + 1);

  return {
    cardNumber: fullNumber.replace(/(\d{4})/g, '$1 ').trim(),
    type: type.toUpperCase(),
    cvv: type === 'amex' ? String(Math.floor(Math.random() * 9000) + 1000) : String(Math.floor(Math.random() * 900) + 100),
    expiry: `${expMonth}/${expYear}`,
    holderName: faker.person.fullName(),
    isValidLuhn: validateLuhn(fullNumber)
  };
}

export function validateLuhn(cardNumber: string): boolean {
  const clean = cardNumber.replace(/\D/g, '');
  if (!clean || clean.length < 13) return false;
  let sum = 0;
  let isEven = false;
  for (let i = clean.length - 1; i >= 0; i--) {
    let digit = parseInt(clean.charAt(i), 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}
