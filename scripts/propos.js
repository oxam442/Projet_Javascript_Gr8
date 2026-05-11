// base de donnée
const missionsData = {
    1: {
        title: "Faciliter la Collaboration",
        description: `Créer des outils intuitifs qui permettent aux équipes de collaborer efficacement, 
        où qu'elles soient dans le monde. Chez CowalkZilla, nous croyons que la distance ne devrait jamais 
        être un obstacle à la productivité. Nos solutions incluent des espaces de travail partagés, des 
        tableaux collaboratifs en temps réel, et des outils de communication intégrés qui facilitent 
        l'échange d'idées et la prise de décision collective. Nous investissons continuellement dans 
        l'amélioration de l'expérience utilisateur pour que chaque interaction soit fluide et naturelle.`
    }, 
    2: {
        title: "Innover Constamment",
        description: `Rester à la pointe de la technologie en développant des fonctionnalités innovantes 
        qui anticipent les besoins de demain. Notre équipe R&D travaille sans relâche pour intégrer les 
        dernières avancées en intelligence artificielle, en apprentissage automatique et en analyse de 
        données. Nous explorons constamment de nouvelles façons d'améliorer la productivité, d'automatiser 
        les tâches répétitives et de fournir des insights précieux pour aider les équipes à prendre de 
        meilleures décisions. L'innovation est au cœur de notre ADN, et nous ne nous reposons jamais sur 
        nos acquis.`
    },
    3: {
        title: "Démocratiser l'Accès",
        description: `Rendre nos outils accessibles à tous, des petites startups aux grandes entreprises, 
        avec une attention particulière à l'expérience utilisateur. Nous offrons des plans tarifaires 
        flexibles adaptés à tous les budgets, y compris une version gratuite généreuse pour les petites 
        équipes et les organisations à but non lucratif. Notre interface est conçue pour être intuitive, 
        réduisant la courbe d'apprentissage et permettant aux utilisateurs de devenir productifs dès le 
        premier jour. Nous proposons également des ressources de formation complètes, des tutoriels vidéo 
        et un support client exceptionnel pour accompagner chacun dans sa réussite.`
    },
    4: {
        title: "Construire une Communauté",
        description: `Créer un écosystème d'utilisateurs engagés qui partagent leurs bonnes pratiques 
        et s'entraident mutuellement. Notre communauté est le cœur battant de CowalkZilla. Nous organisons 
        régulièrement des webinaires, des événements de networking et des hackathons pour permettre aux 
        utilisateurs de se rencontrer, d'échanger et d'apprendre les uns des autres. Notre forum actif et 
        nos groupes sur les réseaux sociaux permettent des discussions enrichissantes et le partage de 
        templates, d'astuces et de workflows optimisés. Nous valorisons chaque membre de notre communauté 
        et encourageons la collaboration au-delà des frontières organisationnelles.`
    }
};

// fonction pour afficher dans un popup les missions
function modal(number){
    // récupération de l'id
    let mission = document.getElementById("popupMission");
    // affichage de la popup
    let content= `
        <div class="popupClass">
            <div id="buttonclose" onclick="modalClose()">X</div>
            <h2>${missionsData[number].title}</h2>
            <div>${missionsData[number].description}</div>
        </div>
    `;
    // afficher le contenu et le popup
    mission.innerHTML=content;
    mission.style.display="flex";
}

// permet de fermer la page popup
function modalClose(){
    document.getElementById("popupMission").style.display="none";
}

