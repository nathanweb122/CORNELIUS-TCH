/**
 * Google Sheets v4 API Service
 * Standardized client-side REST calls using Google OAuth Bearer Tokens.
 */

export interface SpreadsheetInfo {
  spreadsheetId: string;
  spreadsheetUrl: string;
  properties: {
    title: string;
  };
  sheets: Array<{
    properties: {
      sheetId: number;
      title: string;
    };
  }>;
}

/**
 * Creates a brand new Google Spreadsheet with default header row
 */
export async function createSpreadsheet(
  accessToken: string,
  title: string,
  headers: string[] = ['Timestamp', 'Client Name', 'Email', 'Service / Asset', 'Status', 'Notes']
): Promise<SpreadsheetInfo> {
  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        title
      },
      sheets: [
        {
          properties: {
            title: 'Data Sync'
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: headers.map(header => ({
                    userEnteredValue: { stringValue: header },
                    userEnteredFormat: {
                      textFormat: { bold: true },
                      backgroundColor: { red: 0.05, green: 0.1, blue: 0.2 }
                    }
                  }))
                }
              ]
            }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to create spreadsheet (${response.status})`);
  }

  return response.json();
}

/**
 * Appends rows of values to an existing Google Spreadsheet
 */
export async function appendRowsToSpreadsheet(
  accessToken: string,
  spreadsheetId: string,
  range: string,
  values: any[][]
): Promise<any> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      values
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to append rows to sheet (${response.status})`);
  }

  return response.json();
}

/**
 * Reads values from a Google Spreadsheet range
 */
export async function readSpreadsheetValues(
  accessToken: string,
  spreadsheetId: string,
  range: string = 'A1:Z100'
): Promise<any[][]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to fetch spreadsheet values (${response.status})`);
  }

  const data = await response.json();
  return data.values || [];
}

/**
 * Fetches metadata details for a spreadsheet
 */
export async function getSpreadsheetDetails(
  accessToken: string,
  spreadsheetId: string
): Promise<SpreadsheetInfo> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to fetch spreadsheet details (${response.status})`);
  }

  return response.json();
}
