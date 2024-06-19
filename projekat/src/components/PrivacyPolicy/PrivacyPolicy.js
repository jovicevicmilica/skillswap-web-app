import React from 'react';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  //POLITIKA PRIVATNOSTI
  const items=[
    "Koje lične podatke prikupljamo sa naše web stranice na skillswap.com („Sajt“);",
    "Kako koristimo podatke;",
    "S kim možemo dijeliti lične podatke;",
    "Skladištenje i sigurnost vaših podataka;",
    "Vaša prava, izbori i obavještenja u vezi sa privatnošću;",
    "Korisnici izvan Crne Gore; i",
    "Linkovi ka drugim sajtovima, ažuriranja Politike Privatnosti i Kontakt Informacije."
  ];

  const items1=[
    "da odgovorimo na vaše upite i pružimo ili poboljšamo usluge koje zahtijevate;",
    "da izvršimo naše ugovorne obaveze;",
    "da vam pružimo ažuriranja i druge važne informacije vezane za vašu aktivnost na Sajtu i sa Sajtom;",
    "da vas informišemo o novim uslugama ili promjenama na Sajtu ili uslugama koje pružamo;",
    "za administraciju Sajta;",
    "za zaključivanje ugovora o uslugama;",
    "da ispunimo pravne obaveze koje imamo prema vladinim autoritetima ili drugim trećim stranama;",
    "za generisanje analitike i uvida; i",
  	"za druge legitimne poslovne svrhe."
  ];

  return (
    <div className="privacy-container">
      <div className="privacy-content"> {/*dodatni div za bojanje pozadine*/}
        <h1>SkillSwap Politika Privatnosti</h1>
        <p>Ažurirano: Mart 2024</p>
        <p>
          Pažljivo pročitajte ovu Politiku Privatnosti koja opisuje politike rukovanja ličnim podacima kompanije SkillSwap, uključujući sljedeće:
        </p>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>SkillSwap može biti takođe spomenut u ovom dokumentu kao „mi“ ili „nas“.</p>

        <h2>Lični podaci koje prikupljamo ili obrađujemo</h2>
        <p>Sajt automatski prikuplja neke informacije o vama koristeći tehnologije pozadinskog lokalnog skladištenja i skladištenja sesija („Kolačići“) kako bi poboljšao korisničko iskustvo. Kolačići su male datoteke ili drugi komadi podataka koji se preuzimaju ili čuvaju na vašem računaru ili drugom uređaju, koji mogu biti povezani s informacijama o vašoj upotrebi Sajta. Primjeri informacija ovog tipa su vaša IP adresa, pregledač koji koristite, operativni sistem koji koristite, stranice na web stranici koje posjećujete. Kada koristimo Kolačiće, možemo koristiti „sesijske“ Kolačiće koji traju dok ne zatvorite pregledač ili „stalne“ kolačiće koji traju dok ih vi ili vaš pregledač ne izbrišete. Možete promijeniti podešavanja pregledača da odbijete upotrebu Kolačića.</p>
        <p>Možemo prikupiti informacije koje dobrovoljno pružate nama, kao što su vaše ime i e-mail adresa, što može nastati, na primjer, kada se prijavite da primate novosti, obavještenja i pozivnice i kontaktirate nas putem e-maila. Koristimo ove informacije samo da odgovorimo na vaše komentare, zahtjeve ili pitanja. Pružanje ovih informacija je potpuno dobrovoljno. <b>Molimo vas da nam ne šaljete nikakve osjetljive lične informacije.</b></p>
        <p>Ne prikupljamo svjesno informacije od korisnika našeg sajta koji su mlađi od 18 godina i/ili njihovu Internet upotrebu, i takve osobe nisu ovlaštene da koriste Sajt. Ako dobijemo stvarno znanje da je posjetilac našeg Sajta mlađi od 18 godina, preduzećemo korake da uklonimo te lične podatke iz naših baza podataka. Korišćenjem Sajta, izjavljujete da ste stari najmanje 18 godina. Takođe izjavljujete, pristupajući ili koristeći Sajt, da ste zakonski sposobni da sklopite pravne sporazume.</p>

        <h2>Kako koristimo podatke</h2>
        <p>Koristimo lične podatke koje prikupljamo na sljedeće načine:</p>
        <ul>
          {items1.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>Možete se odjaviti od bilo kakvih elektronskih marketinških komunikacija koje možda primite od nas.</p>

        <h2>S kim dijelimo lične podatke</h2>
        <p>Vaše lične informacije se dijele sa, i dostupne su, trećim stranama koje izvode usluge u naše ime, uključujući bez ograničenja naše pružaoce usluga, provajdere tehnologije i profesionalne savjetnike.</p>
        <p>Možemo otkriti bilo koje informacije koje imamo o vama (uključujući vaš identitet) ako utvrdimo da je takvo otkrivanje neophodno u vezi sa bilo kojom istragom ili žalbom u vezi sa vašom upotrebom Sajta, ili da identifikujemo, kontaktiramo ili preduzmemo pravnu akciju protiv nekoga ko može nanijeti štetu ili ometati (namjerno ili nenamjerno) naša prava ili imovinu, ili prava ili imovinu posjetilaca ili korisnika Sajta. Zadržavamo pravo u svako doba da otkrijemo bilo koje informacije za koje smatramo da su neophodne da se uskladimo sa bilo kojim važećim zakonom, propisom, pravnim postupkom ili vladinim zahtjevom. Takođe možemo otkriti vaše informacije kada utvrdimo da važeći zakon zahtijeva ili dozvoljava takvo otkrivanje, uključujući razmjenu informacija sa drugim kompanijama i organizacijama radi zaštite od prevara.</p>
        <p>Vaše informacije mogu biti prenesene drugoj kompaniji u vezi sa spajanjem ili u slučaju da naše poslovanje bude stečeno u cjelini ili djelimično od strane druge kompanije.</p>
        <p>Možemo dijeliti agregirane i anonimizirane informacije sa trećim stranama za analitičke, istraživačke ili slične svrhe.</p>
        <p>Možemo povremeno dobiti vaš pisani pristanak u elektronskom obliku korišćenjem online sporazuma ili drugih priznanja na Sajtu, uključujući i za bilo koju drugu predviđenu upotrebu vaših ličnih podataka koja nije navedena u ovoj Politici Privatnosti. Pažljivo pročitajte sve onlajn ugovore prije nego što ih prihvatite.</p>

        <h2>Skladištenje i zaštita vaših podataka</h2>
        <p>Čuvamo prikupljene lične podatke koliko je razumno potrebno da se ispune svrhe za koje su podaci prikupljeni i da se izvrše naše ugovorne i zakonske obaveze. Bez obzira na opštost prethodnog, čuvamo e-mail adrese dok korisnik ne zatraži odjavu ili se sam ne ukloni kroz bilo koji alat za samouslugu koji je korisnicima na raspolaganju.</p>
        <p>Preduzimamo razumne administrativne, fizičke i tehničke mjere predostrožnosti da zaštitimo vaše lične podatke i komunikaciju između nas. To uključuje, kada je potrebno ili kako smatramo prikladnim i izvodljivim pod okolnostima, enkripciju i pismene obaveze od strane trećih lica koja mogu imati pristup vašim podacima da će zaštiti podatke mjere zaštite koje su u suštini ekvivalentne onima koje mi koristimo.</p>
        <p>Međutim, ni jedan Internet ili e-mail prenos nikada nije potpuno siguran niti bez grešaka. Stoga ne možemo garantovati apsolutnu sigurnost vaših podataka, i nismo odgovorni za procese i mreže koje ne kontrolišemo. Korisnici preuzimaju rizik od bezbjednosnih propusta i posljedica koje proizilaze iz njih. Budite pažljivi pri odlučivanju koje informacije šaljete nama putem e-maila ili preko Interneta.</p>

        <h2>Vaša prava, izbori i obavještenja</h2>
        <p>Posvećeni smo olakšavanju ostvarivanja vaših prava koje vam daju zakoni vaše jurisdikcije, što može uključivati pravo da tražite ispravku, modifikaciju ili brisanje vaših ličnih informacija i pravo da se odjavite od prodaje vaših ličnih informacija (ako je primjenjivo). Učinićemo sve što je u našoj moći da ispoštujemo vaše zahtjeve podložno bilo kojim pravnim i ugovornim obavezama. Ako želite da podnesete zahtjev, kontaktirajte nas na <a href="mailto:skillswap24@gmail.com?">skillswap24@gmail.com</a>.</p>

        <h2>Korisnici izvan Crne Gore</h2>
        <p>Sajt se kontroliše i upravlja iz Crne Gore. Ako ste pojedinac iz Evropske Unije ili bilo koje druge jurisdikcije sa zakonima ili propisima koji upravljaju prikupljanjem, korišćenjem i otkrivanjem ličnih podataka koji se razlikuju od zakona Crne Gore, budite obavješteni da možemo čuvati informacije koje prikupimo u Crnoj Gori koje nisu smatrane „adekvatnom jurisdikcijom“ od strane evropskih regulatornih tijela. Lični podaci se takođe mogu prenijeti iz zemlje vašeg boravišta u druge zemlje.</p>
        
        <h2>Linkovi ka drugim sajtovima</h2>
        <p>Naš sajt može sadržati linkove ka drugim web sajtovima za vašu udobnost ili informisanje. Ovi web sajtovi mogu biti upravljani od strane kompanija koje nisu povezane sa nama, i mi nismo odgovorni za sadržaj ili prakse privatnosti tih web sajtova. Povezani web sajtovi mogu imati svoje uslove korišćenja i politike privatnosti, i mi vas ohrabrujemo da pregledate te politike svaki put kada posjetite te web sajtove.</p>

        <h2>Promjene Politike Privatnosti</h2>
        <p>Mi možemo ažurirati ovu Politiku Privatnosti s vremena na vrijeme i to bez prethodne najave kako bismo odražali promjene u našim praksama informisanja, i bilo koja takva izmjena će se primjenjivati na informacije koje su već prikupljene i koje će biti prikupljene. Vaša kontinuirana upotreba sajta nakon bilo kakvih promjena u našoj Politici Privatnosti ukazuje na vašu saglasnost sa uslovima revidirane Politike Privatnosti. Molimo vas da povremeno pregledate ovu Politiku Privatnosti i posebno prije nego što nam pružite lične podatke. Ako napravimo materijalne promjene u ovoj Politici Privatnosti, obavijestićemo vas ovdje, putem e-maila ili putem obavještenja na našoj početnoj stranici. Datum posljednjeg ažuriranja Politike Privatnosti je naveden na vrhu ove Politike Privatnosti.</p>

        <h2>Pitanja i Kontakt informacije</h2>
        <p>Ako imate bilo kakvih pitanja, molimo vas da nas kontaktirate na <a href="mailto:skillswap24@gmail.com">skillswap24@gmail.com</a>.</p>
        {/*ovo mailto je da bi se na moj mejl (mejl za "firmu") direktno uputila sva pitanja*/}
      </div>
      <div className="black-block"></div>
    </div>
  );
}

export default PrivacyPolicy;