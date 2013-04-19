Projekt medlemmar:
Sebastian Rauhala sebra729@student.liu.se
Philip Zanderholm phiza664@student.liu.se

# Projektid�n � Ideanizer
Projektiden �r att utveckla en flexibel och webbaserad �idea board� som personer ska 
kunna anv�nda n�r de �r i id�fasen av ett projekt, ge en �verblick av ett befintligt 
projekt eller �ven ha m�jlighet att anv�nda ideaboarden som ett scrumverktyg. Som en 
anslagstavla p� webben i stort sett men med mycket frihet. En liknande riktning skulle 
vara att anv�nda verktyget som ett hj�lpmedel till att skapa en mental modell �ver tex ett 
skol�mne, webbflikar eller annan data. Flera anv�ndare ska �ven kunna kollaborera. Ett 
tidigt designf�rslag kan ses i figur 1 d�r en liten mindmap �ver Ideanizer. 


Technological specification:

(1)	Server framework
P� serversidan skulle vi vilja anv�nda oss utav node.js som verkar vara ett popul�rt och v�xande server verktyg.

(2)	Client framework
P� client sidan JQuery. 

(3)	JSON, XML or other protocol to send data between the server and client. 
Som protokol mellan server och klient kommer vi anv�nda JSON. 

(4)	ORM or data storage technique you will use. 
Vi har kollat p� alternativ f�r grafdatabas som skulle vara intressant att testa. Neo4j 
�r ett popul�rt verktyg f�r detta som ocks� ofta anv�nds ihop med node js. 

(5)	authentication 
F�r inloggining verkar Passport js vara ett bra mellan verktyg f�r node js. Som �r kompatibelt med b�de 
openID och OAuth 2.0, D�r OAuth verkar vara det mest anv�ndarv�nliga ramverket.
