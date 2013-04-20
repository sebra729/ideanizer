Projekt medlemmar:
Sebastian Rauhala sebra729@student.liu.se
Philip Zanderholm phiza664@student.liu.se

# Projektidén – Ideanizer
Projektiden är att utveckla en flexibel och webbaserad “idea board” som personer ska 
kunna använda när de är i idéfasen av ett projekt, ge en överblick av ett befintligt 
projekt eller även ha möjlighet att använda ideaboarden som ett scrumverktyg. Som en 
anslagstavla på webben i stort sett men med mycket frihet. En liknande riktning skulle 
vara att använda verktyget som ett hjälpmedel till att skapa en mental modell över tex ett 
skolämne, webbflikar eller annan data. Flera användare ska även kunna kollaborera. Ett 
tidigt designförslag kan ses i figur 1 där en liten mindmap över Ideanizer. 


![design bild](http://gitlab.ida.liu.se/sebra729/ideanizer/blob/master/awebb.jpg "design bild")

## Technological specification:

1. Server framework
På serversidan skulle vi vilja använda oss utav node.js som verkar vara ett populärt och växande server verktyg.

2. Client framework
På client sidan JQuery. 

3. JSON, XML or other protocol to send data between the server and client. 
Som protokol mellan server och klient kommer vi använda JSON. 

4. ORM or data storage technique you will use. 
Vi har kollat på alternativ för grafdatabas som skulle vara intressant att testa. Neo4j 
är ett populärt verktyg för detta som också ofta används ihop med node js. 

5. Authentication 
För inloggining verkar Passport js vara ett bra mellan verktyg för node js. Som är kompatibelt med både 
openID och OAuth 2.0, Där OAuth verkar vara det mest användarvänliga ramverket.