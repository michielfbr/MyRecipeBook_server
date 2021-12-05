"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "recipes",
      [
        {
          title: "Gebraden kipfilet in pancetta met prei en tijm",
          instructions:
            "Verwarm je oven voor op 200 °C of stand 6. Doe 1 kipfilet, zonder vel dit keer, in een kom. Maak een grote prei schoon, was hem en snijd hem in plakjes van 0,5 cm dik. Doe de prei, de blaadjes van een vers takje tijm, een flinke scheut olijfolie, een klontje boter, een snuf zeezout en zwarte peper uit de molen en een scheutje witte wijn bij de kipfilet en hussel alles door elkaar. Leg je prei en smaakgevers uit de kom in een bakje van aluminiumfolie. Wikkel je kipfilet in 6 of 7 plakjes pancetta. De pancetta geeft het kippenvlees niet alleen smaak, maar beschermt het ook terwijl het in de oven staat. Buig de zijkanten van het bakje naar binnen, min of meer over de kip, zodat de prei niet gaat verbranden. Sprenkel er wat olijfolie over, leg er een paar takjes tijm op en zet het bakje 25 tot 35 minuten in het midden van de oven.",
          cookingTime: "01:00",
          imageUrl:
            "https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/466_1_1436883052.jpg",
          reference: "Jamie Oliver",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Oudhollandse poffertjes",
          instructions:
            "Bloem met snufje zout, 1 tl suiker en gist mengen, ei erdoor roeren, al roerende deel voor deel de melk toevoegen, goed roeren tot een glad beslag, beslag afdekken en op warme tochtvrije plaats 11/2 uur laten rijzen.  Boter smelten, met kwastje met gesmolten boter de kuiltjes in de poffertjespan invetten, laagje beslag in de kuiltjes schenken, in 5 min poffertjes gaar en bruin bakken, halverwege keren, op een schaal leggen en in een oven die op 100 gr is verwarmd warmhouden, op dezelfde manier de rest van de poffertjes bakken.  Poffertjes over borden verdelen, met poedersuiker bestrooien en een klont boter erop leggen. Poffertjes zijn afgeleid van de oudhollandse poffer of broeder. Vroeger waren poffers en broeders favoriet gebak in Nederland, dat werd gegeten met stroopsaus of boter en suiker. Poffertjes, ook wel bollebuisjes genoemd, worden van hetzelfde beslag gemaakt als grote poffers, maar gebakken in de speciaal daarvoor bestemde poffertjespan. Poffertjes zijn warm het lekkerst, met een klontje boter en royaal bestrooid met poedersuiker. Natuurlijk hoort er een beker warme chocolademelk met slagroom bij.",
          cookingTime: "02:00",
          imageUrl:
            "https://ohmydish.nl/wp-content/uploads/2016/10/Poffertjes.jpg",
          reference: "",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Nasi Goreng",
          instructions:
            "Rijst opzetten en gaar koken. Knoflook, ui (die je eerst in stukjes snijdt), trassi, kerrie en sambal fijn stampen in de vijzel. Als je geen vijzel hebt, sla je dit over en begin je direct met fruiten. Gehakt in de pan doen (olie is niet nodig i.h.a.). Als het begint te kleuren ui, knoflook, trassi, kerrie en sambal toevoegen en mee fruiten. Als het vlees enigszins gaar is geworden 3/4 van de fijngesneden peterselie erbij doen en de ketjap. Eventueel ook de garnalen. Als het te droog is kun je er nog ketjap naar smaak bijdoen. Laten sudderen tot het vlees gaar is. De rijst erbij doen en goed door elkaar mengen. Opdienen na er de restant van de peterselie over gestrooid te hebben. Je kunt er omelet in reepjes overheen doen. Soms doe ik er ook een prei doorheen die ik mee fruit met het vlees. ",
          cookingTime: "00:45",
          imageUrl:
            "https://www.mindyourfeed.nl/wp-content/uploads/2020/08/nasi-goreng-2-2.jpg",
          reference: "Liefs, mama",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Tajine met kip, abrikozen en pruimen",
          instructions:
            "Rooster het amandelschaafsel en de sesamzaadjes (apart) in een droge koekenpan. Zet apart tot het opdienen. Verhit de olie in een tajine of braadpanen braad hierin de kip. Neem ze uit de pan zodra ze mooi bruin zijn. Bak vervolgens de uien in het overgebleven vet. Voeg dan de pruimen, de abrikozen, de honing, het citroensap, het komijnpoeder en de kaneelstokjes toe. Roer dit even door en voeg dan de kip weer toe. Schenk er voldoende water bij, zodat alles half onder staat. Breng op smaak met peper en zout. Doe het deksel op de tajine/pan, breng aan de kook en laat daarna alles zachtjes sudderen voor zo`n 40 minuten. Als de saus mooi is ingekookt, kun je opdienen. Haal de kaneelstokjes eruit, want die kun je natuurlijk niet eten. Leg de poten op 2 borden en verdeel de abrikozen, pruimen en de saus erover. Strooi vlak voor het opdienen de sesamzaadjes en het amandelschaafsel over de kip. Heerlijk met couscous of rijst. Let op: als je dit recept voor 4 personen maakt, is het van belang dat je de hoeveelheid water verdubbelt. Ook de kruiden en specerijen moeten verdubbeld worden, maar proef natuurlijk altijd even! Pruimen en abrikozen kunnen natuurlijk naar smaak toegevoegd worden.",
          cookingTime: "00:45",
          imageUrl:
            "https://smulweb-infra-smulwebbackendpublicbucket7daa1a81-1um3gn7obc0l4.s3.eu-central-1.amazonaws.com/public/sites/default/files/recipe-images/50_plus-539-4171-0611091440-gestoofdezoetekipmetamandelenencouscous_1.jpg",
          reference: "https://www.smulweb.nl/recepten/1396705/Tajine-met-kip-abrikozen-en-pruimen",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Fried egg",
          instructions:
            "1. Heat the oil in a baking pan. 2. When the oil is hot, break the eggs and put in pan. 3. Let it cook until the egg solidifies. 4. Serve the eggs.",
          cookingTime: "00:15",
          imageUrl:
            "https://dejuistekooktijd.nl/wp-content/uploads/2021/09/ei-bakken.jpg",
          reference: "Mom",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("recipes");
  },
};
