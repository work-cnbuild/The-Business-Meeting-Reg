/**
 * Google Apps Script code to connect The Business Meeting 2026 landing page
 * directly to a Google Sheet.
 */
export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * THE BUSINESS MEETING 2026 - Registration Google Apps Script
 *
 * HOW TO SET UP:
 * 1. Open Google Sheets (https://sheets.new) and create a new spreadsheet.
 * 2. Name it "The Business Meeting 2026 - Attendees".
 * 3. In the top menu, click Extensions > Apps Script.
 * 4. Delete any code currently in the editor (Code.gs) and paste this entire file.
 * 5. Click "Save" (the floppy disk icon).
 * 6. Click "Deploy" > "New deployment".
 * 7. Click the gear icon next to "Select type" and choose "Web app".
 * 8. Set Description to: "The Business Meeting 2026 Registration"
 * 9. Set "Execute as" to: "Me (your email)"
 * 10. Set "Who has access" to: "Anyone" (VERY IMPORTANT so the landing page can submit without requiring Google login).
 * 11. Click "Deploy" and authorize permissions if prompted.
 * 12. Copy the "Web app URL" (starts with https://script.google.com/macros/s/...).
 * 13. Add this URL to your .env file as VITE_GOOGLE_SCRIPT_URL or in the website settings.
 */

function setupHeaders(sheet) {
  var headers = [
    "Timestamp",
    "Full Name",
    "Email",
    "WhatsApp Number",
    "Age Range",
    "Location",
    "Participant Type",
    "Business Industry",
    "Business Age",
    "Monthly Revenue",
    "Team Size",
    "Biggest Business Challenge",
    "Coaching Interest",
    "Coaching Challenge",
    "Paid Coaching/Consulting Interest",
    "Source"
  ];
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var range = sheet.getRange(1, 1, 1, headers.length);
    range.setFontWeight("bold");
    range.setBackground("#0f2042");
    range.setFontColor("#ffffff");
    sheet.setFrozenRows(1);
    for (var i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    setupHeaders(sheet);

    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }

    var row = [
      data.timestamp || new Date().toLocaleString(),
      data.fullName || "",
      data.email || "",
      data.whatsApp || "",
      data.ageRange || "",
      data.location || "",
      data.participantType || "",
      data.businessIndustry || "",
      data.businessAge || "",
      data.monthlyRevenue || "",
      data.teamSize || "",
      Array.isArray(data.biggestChallenge) ? data.biggestChallenge.join(", ") : (data.biggestChallenge || ""),
      data.coachingInterest || "",
      data.coachingChallenge || "",
      data.paidCoachingInterest || "",
      data.source || ""
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ 
      result: "success", 
      message: "Registration recorded successfully",
      row: sheet.getLastRow() 
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      result: "error", 
      error: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
    status: "The Business Meeting 2026 Registration webhook is active and ready." 
  })).setMimeType(ContentService.MimeType.JSON);
}
`;
