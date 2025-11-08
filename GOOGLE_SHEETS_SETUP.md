# Google Sheets Integration Setup Guide

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "AI Health Assistant Contacts"
4. Create a sheet tab named "AI Health Contacts"
5. Add the following headers in row 1:
   - A1: Timestamp
   - B1: First Name
   - C1: Last Name
   - D1: Phone Number
   - E1: Location
   - F1: Source

## Step 2: Get Google Sheets API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable the Google Sheets API
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy the API key

## Step 3: Get Spreadsheet ID

1. Open your Google Sheet
2. Copy the ID from the URL: `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`
3. The ID is the part between `/d/` and `/edit`

## Step 4: Set Environment Variables

Create a `.env.local` file in your project root with:

```env
GOOGLE_SHEET_ID=your_spreadsheet_id_here
GOOGLE_SHEETS_API_KEY=your_api_key_here
```

## Step 5: Test the Integration

1. Start your development server
2. Use the contact form
3. Check your Google Sheet for new entries

## Security Notes

- Keep your API key secure
- Consider restricting the API key to your domain
- The API key should only have access to Google Sheets API
