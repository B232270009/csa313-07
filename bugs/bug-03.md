# BUG-03: Буруу JSON бүхий POST хүсэлтэд API 200 OK буцаана

Орчин: Уншлагын жагсаалт v2.0, Chromium 159.0.8154.6, Windows 11, 2026-11-18.

Урьдчилсан нөхцөл: өмнөх node app.js процессыг Ctrl+C-ээр зогсоож, Lab7 хавтсанд node app.js гэж шинээр асаасан; анхны 3 номтой, хайлт хоосон.

## Дахин гаргах алхам

1. Аппыг шинээр асаасны дараа Lab7 хавтсанд PowerShell нээнэ.
2. Доорх curl.exe командыг ажиллуулна.
3. Хариуны HTTP статусын мөр болон биеийг харна.

```powershell
curl.exe -i -X POST http://localhost:3000/api/books -H "Content-Type: application/json" --data-binary "@evidence/bug-03-body.txt"
```

Хүлээгдэж байсан: Спецификацийн API дүрмээр буруу JSON биед HTTP 400 буцаана.

Бодит үр дүн: HTTP/1.1 200 OK, бие нь {"result":"OK"} байв. Буруу оролтыг амжилттай гэж мэдээлж байна.

Ноцтой байдал: **Major** — API хэрэглэгч хүсэлт буруу байсныг статусаар таних боломжгүй.

Олдсон аялал: **Saboteur**.

## Хавсралт

[Анхны curl -i бүтэн хариу](../evidence/bug-03-curl.txt), [дахин шалгасан curl -i хариу](../evidence/bug-03-recheck-curl.txt), [request body](../evidence/bug-03-body.txt).

Шинээр асаасан төлөвөөс [дахин шалгасан бүртгэл](../evidence/reproduction-check.json)-ийн 03 мөр confirmed=true байна.
