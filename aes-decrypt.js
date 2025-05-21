function padKey(key) {
  const desiredLengths = [16, 24, 32];
  for (let len of desiredLengths) {
    if (key.length <= len) {
      return key.padEnd(len, '0');
    }
  }
  return key.slice(0, 32);
}

function encryptFile() {
  const keyInput = document.getElementById("encryptKey").value;
  const fileInput = document.getElementById("plainFileInput").files[0];
  const downloadLink = document.getElementById("encryptDownloadLink");
  const status = document.getElementById("encryptStatus");

  if (!keyInput || !fileInput) {
    status.innerText = "⚠️ Vui lòng nhập khóa và chọn file.";
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const content = e.target.result;
    const key = CryptoJS.enc.Utf8.parse(padKey(keyInput));
    const encrypted = CryptoJS.AES.encrypt(content, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();

    const blob = new Blob([encrypted], { type: "text/plain" });
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "encrypted.txt";
    downloadLink.style.display = "inline-block";
    downloadLink.innerText = "📥 Tải file đã mã hóa";

    status.innerText = "✅ Mã hóa thành công!";

    // 👉 Hiện phần giải mã sau khi mã hóa xong
    document.getElementById("decryptSection").style.display = "block";
  };

  reader.readAsText(fileInput);
}

function decryptFile() {
  const keyInput = document.getElementById("key").value;
  const fileInput = document.getElementById("fileInput").files[0];
  const downloadLink = document.getElementById("downloadLink");
  const status = document.getElementById("status");

  if (!keyInput || !fileInput) {
    status.innerText = "⚠️ Vui lòng nhập khóa và chọn file.";
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const encrypted = e.target.result;
    const key = CryptoJS.enc.Utf8.parse(padKey(keyInput));
    try {
      const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }).toString(CryptoJS.enc.Utf8);

      if (!decrypted) {
        status.innerText = "❌ Sai khóa hoặc dữ liệu lỗi!";
        return;
      }

      const blob = new Blob([decrypted], { type: "text/plain" });
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "decrypted.txt";
      downloadLink.style.display = "inline-block";
      downloadLink.innerText = "📥 Tải file đã giải mã";
      status.innerText = "✅ Giải mã thành công!";
    } catch (err) {
      status.innerText = "❌ Không thể giải mã file!";
    }
  };

  reader.readAsText(fileInput);
}
