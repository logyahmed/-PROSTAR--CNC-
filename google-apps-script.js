// === الصق هذا الكود في Google Apps Script ===
// Extensions > Apps Script > امسح الكود القديم والصق هذا

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    sheet.appendRow([
      new Date().toLocaleString('ar-SA'),
      data.name || '',
      data.company || '',
      data.phone || '',
      data.email || '',
      data.city || '',
      data.machine_type || data.topic || '',
      data.details || data.message || '',
      data.source || 'الموقع'
    ]);
    
    // إرسال إيميل إشعار (اختياري - غيّر الإيميل)
    try {
      MailApp.sendEmail({
        to: 'YOUR_EMAIL@gmail.com',  // ← غيّر هذا لإيميلك
        subject: '🔔 طلب جديد من موقع بروستار - ' + (data.name || 'بدون اسم'),
        htmlBody: '<div dir="rtl" style="font-family:Tahoma;font-size:14px;">' +
          '<h2 style="color:#5BC5C9;">طلب جديد من الموقع</h2>' +
          '<table style="border-collapse:collapse;width:100%;">' +
          '<tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5;"><b>الاسم</b></td><td style="padding:8px;border:1px solid #ddd;">' + (data.name || '-') + '</td></tr>' +
          '<tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5;"><b>الشركة</b></td><td style="padding:8px;border:1px solid #ddd;">' + (data.company || '-') + '</td></tr>' +
          '<tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5;"><b>الجوال</b></td><td style="padding:8px;border:1px solid #ddd;">' + (data.phone || '-') + '</td></tr>' +
          '<tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5;"><b>الإيميل</b></td><td style="padding:8px;border:1px solid #ddd;">' + (data.email || '-') + '</td></tr>' +
          '<tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5;"><b>المدينة</b></td><td style="padding:8px;border:1px solid #ddd;">' + (data.city || '-') + '</td></tr>' +
          '<tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5;"><b>الماكينة</b></td><td style="padding:8px;border:1px solid #ddd;">' + (data.machine_type || data.topic || '-') + '</td></tr>' +
          '<tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5;"><b>التفاصيل</b></td><td style="padding:8px;border:1px solid #ddd;">' + (data.details || data.message || '-') + '</td></tr>' +
          '</table></div>'
      });
    } catch(mailErr) {}
    
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success', message: 'تم الإرسال بنجاح'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// === بعد لصق الكود ===
// 1. غيّر YOUR_EMAIL@gmail.com لإيميلك
// 2. اضغط Deploy > New deployment
// 3. اختر Type: Web app
// 4. Execute as: Me
// 5. Who has access: Anyone
// 6. اضغط Deploy
// 7. انسخ الرابط (URL) اللي يطلع لك
// 8. ضعه في ملفات الموقع بدل YOUR_GOOGLE_SCRIPT_URL
