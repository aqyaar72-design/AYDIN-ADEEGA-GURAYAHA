# AYDIN CLEANING SERVICES — Nooca 2

## Waxa ku jira
- Website Af-Soomaali ah oo mobile-first ah.
- Logo-ga shirkadda.
- WhatsApp sabbaynaya oo boodboodaya, lambarka +91 79819 77002.
- Liiska adeegyada iyo qiimayaasha ₹.
- Booking form; qiimaha adeegyada go'an waa la tusayaa.
- Cooking, laundry iyo xafiisyada: qiime marka la weydiiyo.
- Bogga maamulka oo isticmaala Supabase Auth.
- Supabase SQL schema oo RLS ku ilaalinayo booking-yada.

## 1. Ku rakib kombiyuutarka (Windows PowerShell)
Fur folder-kan VS Code, kadib Terminal:
```powershell
py -m venv .venv
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```
Haddii activation-ku dhib yeesho, si toos ah u isticmaal:
```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe app.py
```
Bilow:
```powershell
python app.py
```
Fur `http://127.0.0.1:5000`.

## 2. Ku xidh Supabase
1. Fur Supabase project-kaaga.
2. Tag SQL Editor, fur `supabase_setup.sql`, oo Run ku dhufo.
3. Tag Authentication > Users, samee user maamulka oo xaqiiji email/password.
4. Nuqul ka samee UUID-ga user-ka, kadib SQL Editor ku orod:
```sql
insert into public.admin_profiles (user_id, role)
values ('USER_UUID_HALKAN_GELI', 'admin');
```
5. Fur `static/js/config.js`; geli Publishable Key-gaaga halka ku qoran `KU_DHEJI_SUPABASE_PUBLISHABLE_KEY_GAAGA`.
   Project URL hore ayaa loogu qoray.
6. Refresh website-ka. Tijaabi booking, kadib gal `/maamulka`.

## Amniga
- Publishable key waa public browser key; RLS policies ayaa xogta ilaalinaya.
- Ha gelin Supabase Secret Key ama Service Role Key gudaha `config.js`, HTML ama JavaScript.
- Ha siin qof kale password-ka maamulka.
- Ka hor production, ku dar CAPTCHA/rate limiting iyo privacy policy.

## Qiimeyaasha ku jira noocan
- Nadaafad bille ah: 1–5 BHK: ₹2,000 / 2,500 / 3,000 / 4,500 / 6,000.
- Hal mar caadi: ₹1,000 / 2,000 / 3,000 / 4,000 / 5,000.
- Hal mar qoto dheer: ₹1,800 / 2,800 / 4,000 / 5,500 / 7,000.
- Pest control: ₹1,500 / 2,000 / 2,500 / 3,000 / 3,500.
- Sofa/carpet/mattress iyo rental brokerage: qiimayaasha ku qoran bogga.
- Cooking, laundry/ironing, office cleaning: qiime marka la weydiiyo.

## Xusuusin
Kani waa nooca bilowga ah ee la tijaabin karo. Hosting online, domain, Supabase key, admin user iyo SQL setup waa in la dhammeystiraa ka hor inta aan macaamiisha loo furin.
