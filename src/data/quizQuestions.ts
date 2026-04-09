export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Qui a remporté la Coupe du Monde 2022 au Qatar ?",
    options: ["Brésil", "Argentine", "France", "Croatie"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "Quel joueur détient le record de buts en Coupe du Monde ?",
    options: ["Pelé", "Ronaldo Nazário", "Miroslav Klose", "Just Fontaine"],
    correctIndex: 2,
  },
  {
    id: 3,
    question: "En quelle année le Maroc a-t-il atteint les demi-finales de la Coupe du Monde ?",
    options: ["2018", "2014", "2022", "2010"],
    correctIndex: 2,
  },
  {
    id: 4,
    question: "Combien d'étoiles figurent sur le maillot du Brésil ?",
    options: ["3", "4", "5", "6"],
    correctIndex: 2,
  },
  {
    id: 5,
    question: "Quel pays accueillera la Coupe du Monde 2026 ?",
    options: ["USA, Mexique, Canada", "Arabie Saoudite", "Angleterre", "Maroc"],
    correctIndex: 0,
  },
  {
    id: 6,
    question: "Qui a marqué le « But du Siècle » en 1986 ?",
    options: ["Pelé", "Zidane", "Maradona", "Cruyff"],
    correctIndex: 2,
  },
  {
    id: 7,
    question: "Quel gardien a arrêté le penalty de Kylian Mbappé en finale 2022 ?",
    options: ["Emiliano Martínez", "Hugo Lloris", "Alisson", "Courtois"],
    correctIndex: 0,
  },
  {
    id: 8,
    question: "Quelle équipe africaine a été la première à atteindre les quarts de finale d'un Mondial ?",
    options: ["Nigeria", "Ghana", "Cameroun", "Sénégal"],
    correctIndex: 2,
  },
  {
    id: 9,
    question: "Combien de fois l'Italie a-t-elle remporté la Coupe du Monde ?",
    options: ["2", "3", "4", "5"],
    correctIndex: 2,
  },
  {
    id: 10,
    question: "Qui a remporté le Ballon d'Or 2023 ?",
    options: ["Mbappé", "Haaland", "Messi", "Bellingham"],
    correctIndex: 2,
  },
];
