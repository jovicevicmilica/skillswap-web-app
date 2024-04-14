import React from 'react';
import './TermsOfUse.css';

function TermsOfUse() {
  const items=[
    "postavljati, otpremati, objavljivati, podnositi ili prenositi bilo koji materijal koji: (a) krši, prisvaja ili narušava patent treće strane, autorska prava, trgovačku marku, tajnu trgovine, moralna prava ili druga prava intelektualne svojine, ili prava na publicitet ili privatnost; (b) krši ili podstiče bilo koje ponašanje koje bi kršilo bilo koji primenljivi zakon ili propis ili bi izazvalo građansku odgovornost; (c) je prevaran, lažan, obmanjujući ili varljiv; (d) je klevetnički, nepristojan, vulgaran ili uvredljiv; (e) promoviše diskriminaciju, netrpeljivost, rasizam, mržnju, uznemiravanje ili štetu protiv bilo koje osobe ili grupe; (f) je nasilan ili prijeteći ili promoviše nasilje ili radnje koje su prijeteće bilo kojoj drugoj osobi; ili (g) promoviše ilegalne ili štetne aktivnosti ili supstance;",
    "ometati ili oštetiti Sajt, uključujući, bez ograničenja, kroz upotrebu virusa, cancel botova, Trojanskih konja, štetnog koda, poplava pingova, napada odbijanja usluge, paket ili IP spoofing, falsifikovanog rutiranja ili elektronskih adresnih informacija ili sličnih metoda ili tehnologija;",
    "kršiti bilo koji lokalni, državni, pokrajinski, nacionalni ili drugi zakon ili propis, ili bilo koji sudski nalog;",
    "prikazivati, ogledati ili okvirivati Sajt, ili bilo koji pojedinačni element unutar Sajta, ime SkillSwap-a, bilo koji zaštitni znak SkillSwap-a, logo ili druge vlasničke informacije, ili raspored i dizajn bilo koje stranice ili obrasca sadržanog na stranici, bez našeg izričitog pismenog odobrenja;",
    "pokušavati istražiti, skenirati ili testirati ranjivost bilo kojeg sistema ili mreže SkillSwap-a ili prekršiti bilo koje mjere sigurnosti ili autentifikacije;",
    "pristupati, ometati ili koristiti nepublične dijelove Sajta, računarske sisteme SkillSwap-a, ili tehničke isporučivačke sisteme provajdera SkillSwap-a;",
    "izbjeći, zaobići, ukloniti, deaktivirati, oslabiti, dešifrovati ili na bilo koji drugi način zaobići bilo koju tehnološku mjeru koju je implementirao SkillSwap ili bilo koji od provajdera SkillSwap-a ili bilo koja treća strana (uključujući drugog korisnika) da zaštiti Sajt ili bilo koji od Sadržaja na Sajtu;",
    "pokušavati dešifrovati, dekompajlirati, rastavljati ili obrnuti inženjering bilo kojeg softvera koji se koristi za pružanje Sajta ili usluga opisanih na Sajtu; ili zagovarati, ohrabrivati ili pomoći bilo kojoj trećoj strani u činjenju bilo kojeg od gore navedenog.",
  ];

  const items1=[
    "elektronski ili fizički potpis osobe ovlaštene da djeluje u ime vlasnika interesa autorskih prava;",
    "opis autorskog djela za koje tvrdite da je prekršeno;",
    "opis materijala za koji tvrdite da je povreda i gdje se nalazi na Sajtu;",
    "identifikacija URL-a ili druge specifične lokacije na Sajtu gdje se materijal za koji tvrdite da je povreda nalazi;",
    "vaša adresa, telefonski broj i email adresa;",
    "izjava od vas da imate dobru vjeru da spornu upotrebu nije ovlastio vlasnik autorskih prava, njegov agent ili zakon;",
    "izjava od vas, data pod krivičnom odgovornošću za krivokletstvo, da su gore navedene informacije u vašoj obavijesti tačne i da ste vi vlasnik autorskih prava ili ovlašteni da djelujete u ime vlasnika autorskih prava."
  ];

  return (
    <div className="terms-container">
      <div className="terms-content"> {/*dodatni div za bojanje pozadine*/}
        <h1>SkillSwap Uslovi Korišćenja</h1>
        <p>Ažurirano: Mart 2024</p>
        <p>
          Hvala što posjećujete SkillSwap. 
          Molimo vas pažljivo pročitajte ove Uslove korišćenja i našu Politiku privatnosti 
          koja se nalazi na našoj internet stranici, a koja je ovim putem ugrađena u ove Uslove korišćenja. 
          Ovi Uslovi korišćenja se primjenjuju na našu internet stranicu na SkillSwap.me („Sajt”).
          SkillSwap se u daljem tekstu može nazivati „mi” ili „nas”.
        </p>
        <p>
          Osim ako nije drugačije navedeno, Sajt i sav Sadržaj (definisan ispod) 
          je vlasništvo SkillSwap-a i njegovih davalaca licenci. Koristeći Sajt, slažete se sa ovim Uslovima korišćenja, 
          našom Politikom privatnosti i svim primjenjivim zakonima i propisima. Ako se ne slažete sa ovim Uslovima korišćenja, 
          ne koristite Sajt.
        </p>
        <p>
          Sajt nije namijenjen za upotrebu od strane djece ili bilo koga ko nije punoljetan i takva osoba nije ovlašćena da ga koristi. 
          Koristeći Sajt, izjavljujete da imate najmanje 18 godina. Takođe izjavljujete, pristupanjem ili korišćenjem Sajta, da ste punoljetni i 
          da imate pravnu sposobnost da stupate u pravne sporazume.
        </p>
        <p>
          SkillSwap zadržava pravo, po svojoj sopstvenoj odluci, da promjeni, modifikuje, doda ili ukloni dijelove ovih Uslova korišćenja, u bilo koje vrijeme. 
          Vaša je odgovornost da povremeno pregledate ove Uslove korišćenja kako bi ste se upoznali sa promjenama. Vaš nastavak korišćenja Sajta nakon objavljivanja 
          promjena ukazuje na vaše saglasnost i prihvatanje promjena.
        </p>

        <h2>Privatnost i sigurnost podataka</h2>
        <p>
          Molimo vas da se uputite na našu Politiku privatnosti za informacije o tome kako prikupljamo, koristimo i otkrivamo informacije od naših korisnika. Takođe, 
          koristeći Sajt, priznajete i slažete se da internet prenosi nikada nisu potpuno privatni ili sigurni. Razumijete da se prenosi prema Sajtu ili preko njega 
          mogu presresti od strane drugih, i korisnici preuzimaju rizik od bezbjednosnih propusta i svih posljedica koje proizilaze iz njih. Molimo vas da nam ne šaljete
          nikakve osjetljive lične informacije.
        </p>

        <h2>Sadržaj</h2>
        <p>
          Osim ako nije drugačije navedeno, sav tekst, grafika, korisnički interfejsi, vizuelni interfejsi, fotografije, zaštitni znaci, logoi, zvukovi, muzika, umjetnička djela 
          i računarski kod (zajedno, „Sadržaj”), uključujući, ali ne ograničavajući se na dizajn, strukturu, odabir, koordinaciju, izraz, „izgled i osećaj” i aranžiranje takvog Sadržaja, 
          na Sajtu su vlasništvo, kontrolisani ili licencirani od ili za SkillSwap i zaštićeni su zakonom o zaštiti modnih krojeva, autorskim pravima, patentnim zakonom i zakonima o zaštitnim znacima,
          kao i različitim drugim pravima intelektualne svojine.
        </p>
        <p>
          Osim kako je izričito navedeno u ovim Uslovima korišćenja, nijedan dio Sajta i nijedan Sadržaj ne mogu se kopirati, reprodukovati, ponovno objavljivati, učitavati, postavljati, javno prikazivati, 
          kodirati, prevoditi, prenositi ili distribuirati na bilo koji način na bilo koji drugi računar, server, web-sajt ili drugi medij za objavljivanje ili distribuciju ili za bilo koji komercijalni 
          poduhvat, bez našeg izričitog prethodnog pisanog pristanka.
        </p>
        <h2>Korisnički prilozi, povratne informacije i informacije</h2>
        <p>
          Priznajete i slažete se da bilo koji prilog, povratna informacija, komentari ili sugestije koje možete dati u vezi sa Sajtom i uslugama koje pružamo direktno ili indirektno (na primjer, kroz upotrebu
          hashtag-a koji je odredila kompanija na stranici društvenih medija treće strane) (zajedno naziv „Prilozi”) nisu povjerljivi ni vlasnički, trebaju se tretirati kao javne informacije, mogu se dijeliti s drugima na drugim sajtovima 
          i platformama i dostavljate ih u skladu s ovim Uslovima korišćenja. Prilozi koji predstavljaju povratnu informaciju, komentare ili sugestije biće isključivo i jedino vlasništvo SkillSwap-a i ovim putem irevokabilno
          nam dodjeljujete sva vaša prava, naslove i interesovanja u vezi sa svim takvim Prilozima, a SkillSwap će imati neograničeno, irevokabilno, globalno, besplatno pravo da koristi, komunicira, reprodukuje, objavljuje, prikazuje, 
          distribuira i iskorištava takve Priloge na bilo koji način koji izabere. Što se tiče svih ostalih Priloga, ovim putem dodjeljujete SkillSwap-u irevokabilnu, globalnu i stalnu licencu da koristi takve Priloge kako je predviđeno 
          ovim Uslovima korišćenja.
        </p>
        <p>
          Vaš prilog Priloga predstavlja garanciju i obeštećenje da imate dovoljnu licencu i/ili druga prava u sadržaju da omogućite sve željeno korišćenje od strane SkillSwap-a. Dajete pristanak, za sebe i u ime bilo koje druge osobe ili djeteta
          čije informacije ili sličnost dostavljate nama, na korišćenje od strane SkillSwap-a informacija i to da se dostavljaju u skladu sa svim važećim zakonima. Odgovorni ste za bilo koji Prilog koji pružate i za sve posljedice koje proizilaze iz toga.
        </p>

        <h2>Vaša upotreba Sajta</h2>
        <p>U vezi sa vašom upotrebom Sajta, saglasni ste da nećete:</p>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>SkillSwap zadržava pravo, u bilo kojem trenutku i bez najave: (1) da izmijeni, suspenduje ili prekine rad ili pristup Sajtu ili bilo kojem dijelu Sajta iz bilo kojeg razloga; (2) da izmijeni ili promijeni Sajt i usluge koje nudimo, ili bilo koji dio istih, i bilo koje primjenjive politike ili uslove; i (3) da prekine rad Sajta ili bilo kojeg dijela Sajta po potrebi radi rutinskog ili nerutinskog održavanja, ispravke grešaka ili drugih izmjena.</p>
        <p>Bilo koje ponašanje korisnika koje prema našem nahođenju ograničava ili sprečava bilo kog drugog korisnika u korišćenju ili uživanju u Sajtu izričito je zabranjeno.</p>

        <h2>Politika autorskih prava</h2>
        <p>Ne dozvoljavamo aktivnosti koje krše autorska prava i prava intelektualnog vlasništva na Sajtu i uklonićemo svaki takav sadržaj ako budemo pravilno obaviješteni da takav sadržaj krši intelektualno vlasništvo nekog drugog. Ako ste vi vlasnik autorskih prava ili agent istog i vjerujete da bilo koji sadržaj krši vaša autorska prava, možete podnijeti obavijest u skladu sa Zakonom o digitalnom milenijumu o autorskim pravima (DMCA) pružajući našem Agentu za autorska prava sljedeće informacije pismeno (vidite 17 U.S.C 512(c)(3) za dodatne detalje):</p>
        <ul>
          {items1.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>Našeg agenta za autorska prava možete kontaktirati putem emaila na <a href="mailto:skillswap24@gmail.com?subject=Autorska prava">skillswap24@gmail.com</a> s naznakom „Autorska prava“ u predmetu poruke.</p>
        {/*automatski stavljam titl i primaoca, sebe*/}
        <p>Nakon prijema takve obavijesti, istražit ćemo i ukloniti materijal po potrebi. Bićete obaviješteni o rezultatima takve istrage.</p>

        <h2>Linkovi na druge sajtove</h2>
        <p>Sajt može sadržavati linkove na druge nezavisne web sajtove trećih strana („LinkedSites“). Ti Linked Sites pružaju se isključivo kao pogodnost našim posjetiocima. Takvi Linked Sites nisu pod kontrolom SkillSwap-a i SkillSwap nije odgovoran za i ne podržava sadržaj takvih sajtova, uključujući bilo koje informacije ili materijale sadržane na takvim sajtovima.</p>

        <h2>Odricanje od odgovornosti; Ograničenje odgovornosti</h2>
        <p>SAJT I SVE USLUGE I SADRŽAJ PONUĐENI KROZ USLUGE PRUŽAJU SE „KAKO JESU, KAKO SU DOSTUPNI.“ SVA JAMSTVA, IZRIČITA ILI IMPLICITNA, UKLJUČUJUĆI BILO KAKVA JAMSTVA TAČNOSTI, NEKRŠENJA, TRGOVAČKE VRIJEDNOSTI I PRIKLADNOSTI ZA ODREĐENU SVRHU, OVDJE SU IZRIČITO ISKLJUČENA U NAJŠIREM OPSEGU DOZVOLJENOM PRIMJENJIVIM ZAKONOM.</p>
        <p>Gore navedeno odricanje odgovornosti odnosi se na sve štete, odgovornost ili povrede, bilo da se radi o kršenju ugovora, deliktu, nemaru ili bilo kojem drugom uzroku djelovanja.</p>
        <p>OSIM GDJE JE ZABRANJENO ZAKONOM, U NIJEDNOM SLUČAJU I POD NIKAKVOM PRAVNOM TEORIJOM, BILI TO DELIKT (UKLJUČUJUĆI NEMAR), UGOVOR ILI DRUGAČIJE, SKILLSWAP ILI NJEGOVI TREĆI DOBAVLJAČI, LICENCORI ILI DOBAVLJAČI NEĆE BITI ODGOVORNI VAMA ZA BILO KAKVE INDIREKTNE, POSEBNE, POSLJEDIČNE, PRIMJERNE, SLUČAJNE ILI KAZNENE ŠTETE, ČAK I AKO JE SKILLSWAP BIO OBAVIJEŠTEN O MOGUĆNOSTI TAKVIH GUBITAKA ILI ŠTETA.</p>
        <p><b>Neke jurisdikcije ne dozvoljavaju isključivanje određenih jamstava ili isključenje ili ograničenje odgovornosti za posljedične ili slučajne štete, pa ova ograničenja možda neće vrijediti za vas.</b></p>

        <h2>Indemnizacija</h2>
        <p>Slažete se da ćete obeštetiti i držati SkillSwap i njegove treće licencore, dobavljače, klijente i dobavljače (zajednički naziv „Indemnizirane strane“) bez štete od bilo kojih zahtjeva, gubitaka, odgovornosti, potraživanja ili troškova (uključujući advokatske honorare), napravljenih protiv Indemnizirane strane od strane bilo koje treće strane zbog ili u vezi sa (1) vašim pristupom ili korištenjem Sajta; (2) vašim kršenjem ovih Uslova korišćenja ili bilo kojeg primjenjivog zakona ili propisa, (3) vašim kršenjem bilo kojih prava bilo koje treće strane; ili (4) bilo kojim sporovima ili problemima između vas i bilo koje treće strane.</p>
        
        <h2>Kršenje Uslova Korišćenja</h2>
        <p>SkillSwap može otkriti bilo koje informacije koje imamo o vama (uključujući vaš identitet) ako utvrdimo da je takvo otkrivanje neophodno u vezi sa bilo kojom istragom ili pritužbom u vezi s vašom upotrebom Sajta, ili da identifikuje, kontaktira ili preduzme pravne radnje protiv nekoga ko može nanositi povredu ili ometati (bilo namjerno ili nenamjerno) prava ili imovinu SkillSwap-a, ili prava ili imovinu posjetilaca ili korisnika Sajta. SkillSwap zadržava pravo u svakom trenutku da otkrije bilo koje informacije koje SkillSwap smatra neophodnim da se uskladi sa bilo kojim primjenjivim zakonom, propisom, pravnim postupkom ili vladinim zahtjevom. SkillSwap može takođe otkriti vaše informacije kada SkillSwap utvrdi da primjenjivi zakon zahtijeva ili dozvoljava takvo otkrivanje, uključujući razmjenu informacija s drugim kompanijama i organizacijama u svrhu zaštite od prevara.</p>
        <p>Slažete se da SkillSwap može, po svom isključivom nahođenju, bez prethodnog obavještenja i u mjeri koja je primjenjiva, prekinuti vaš pristup Sajtu i/ili blokirati vaš budući pristup Sajtu ako utvrdimo da ste prekršili ove Uslove korišćenja ili druge sporazume ili smjernice koje mogu biti povezane s vašom upotrebom Sajta. Takođe se slažete da bilo koje vaše kršenje ovih Uslova korišćenja može prouzrokovati nenadoknadivu štetu SkillSwap-u za koju bi novčana odšteta bila neadekvatna, i dajete pristanak SkillSwap-u da dobije bilo koju zabranu ili pravično olakšanje koje SkillSwap smatra neophodnim ili prikladnim u takvim okolnostima. Ovi lijekovi su dodatak bilo kojim drugim lijekovima koje SkillSwap može imati po zakonu ili u pravičnosti.</p>

        <h2>Važeći zakon</h2>
        <p>Slažete se da sva pitanja koja se odnose na vaš pristup ili upotrebu Sajta, uključujući sve sporove, biće regulisana zakonima Crne Gore: (1) njene principe sukoba zakona;</p>

        <h2>Korisnici izvan Crne Gore</h2>
        <p>SkillSwap je organizovan u Crnoj Gori. Iako je Sajt dostupan globalno, nisu sve funkcije, proizvodi ili usluge raspravljani, referencirani, pružani ili ponuđeni kroz ili na Sajtu dostupni svim osobama ili u svim geografskim lokacijama, niti su prikladni ili dostupni za korištenje izvan Crne Gore. Ako odlučite pristupiti Sajtu izvan Crne Gore, to činite na svoju inicijativu i isključivo ste odgovorni za poštovanje primjenjivih lokalnih zakona.</p>

        <h2>Ostalo</h2>
        <p>Možete sačuvati ove Uslove korišćenja u pisanom obliku štampanjem za vaše zapise, i odričete se bilo kojeg drugog zahtjeva da ovi Uslovi korišćenja budu dokazani pismenim dokumentom. Ne smijete koristiti ili izvoziti ili reizvoziti bilo koji Sadržaj ili bilo koju kopiju ili adaptaciju takvog Sadržaja, ili bilo koji proizvod ili uslugu ponuđenu ili opisanu na Sajtu, u suprotnosti sa bilo kojim primjenjivim zakonima ili propisima, uključujući bez ograničenja izvozne zakone i propise Crne Gore.</p>
        <p>Sve odredbe ovih Uslova korišćenja su razdvojive, i neprimjenjivost ili nevažećnost bilo koje od odredbi neće uticati na primjenjivost ili važećnost preostalih odredbi. Ovi Uslovi korišćenja, zajedno sa Politikom privatnosti i bilo kojim drugim pravnim obavještenjima objavljenim od strane SkillSwap-a, čine cjelokupan sporazum između vas i SkillSwap-a u vezi sa vašim korišćenjem Sajta. Neuspeh SkillSwap-a da insistira ili sprovede strogo izvršenje ovih Uslova korišćenja neće se smatrati odricanjem od strane SkillSwap-a bilo koje odredbe ili bilo kog prava koje ima da sprovede ove Uslove korišćenja. Bilo koje takvo odricanje mora biti u pisanom obliku da bi bilo efikasno. Ovi Uslovi korišćenja neće se tumačiti niti konstruisati da daju bilo kakva prava ili pravna sredstva bilo kojim trećim stranama.</p>

        <h2>Pitanja i Kontakt informacije</h2>
        <p>Ako imate bilo kakvih pitanja, molimo vas da nas kontaktirate na <a href="mailto:skillswap24@gmail.com">skillswap24@gmail.com</a>.</p>
        {/*ovo mailto je da bi se na moj mejl (mejl za "firmu") direktno uputila sva pitanja*/}
      </div>
      <div className="black-block"></div>
    </div>
  );
}

export default TermsOfUse;