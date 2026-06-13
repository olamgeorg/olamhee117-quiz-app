import { Question } from '../types';

export const quizQuestions: Question[] = [
  // --- PDF MODULE 1 (Domestic Violence, Urban Violence, Flooding, Substances, Pollution) ---
  {
    id: 1,
    pdfModule: 1,
    text: "According to the 2018 WHO/UN analysis of global prevalence data (2000-2018) across 161 countries, what proportion of women worldwide have been subjected to physical and/or sexual violence?",
    options: [
      "Nearly 1 in 10 (10%)",
      "Nearly 1 in 5 (20%)",
      "Nearly 1 in 3 (30%)",
      "Nearly 1 in 2 (50%)"
    ],
    correctOptionIndex: 2,
    explanation: "The World Health Organisation (WHO) on behalf of the UN Interagency working group found that worldwide, nearly 1 in 3, or 30%, of women have been subjected to physical and/or sexual violence by an intimate partner or non-partner.",
    pdfSection: "Module Two: Domestic Violence - Prevalence / Statistics (Page 5)"
  },
  {
    id: 2,
    pdfModule: 1,
    text: "Which of the following statistics regarding Intimate Partner Violence (IPV) in Nigeria is NOT accurately cited in the HEE117 manual?",
    options: [
      "31% to 61% for psychological/emotional violence",
      "20% to 31% for sexual violence",
      "7% to 31% for physical violence",
      "50% to 75% for economic deprivation"
    ],
    correctOptionIndex: 3,
    explanation: "Nigeria's IPV prevalence estimates are specifically: 31% to 61% for psychological/emotional violence, 20% to 31% for sexual violence, and 7% to 31% for physical violence. Economic deprivation is not listed with a percentage in this section.",
    pdfSection: "Module Two: Domestic Violence - Prevalence in Nigeria (Page 6)"
  },
  {
    id: 3,
    pdfModule: 1,
    text: "According to Foster (1999) and the Integrated Regional Network (IRIN), which country has the highest statistics of gender-based violence (including rape and domestic violence) in the world?",
    options: [
      "New Zealand",
      "Nigeria",
      "South Africa",
      "Colombia"
    ],
    correctOptionIndex: 2,
    explanation: "South Africa is said to have the highest statistics of gender-based violence in the world, including rape and domestic violence, according to Foster (1999) and IRIN, Johannesburg.",
    pdfSection: "Module Two: Domestic Violence - Global Stats (Page 5)"
  },
  {
    id: 4,
    pdfModule: 1,
    text: "Which developed country has the highest rate of reported intimate partner violence (IPV) in the developed world, according to the tutorial sheet?",
    options: [
      "United States",
      "New Zealand",
      "United Kingdom",
      "Australia"
    ],
    correctOptionIndex: 1,
    explanation: "New Zealand has the highest rate of reported intimate partner violence in the developed world.",
    pdfSection: "Module Two: Domestic Violence - Developed World (Page 6)"
  },
  {
    id: 5,
    pdfModule: 1,
    text: "In Oyo State, Nigeria, a study by Ajibola et al. (2017) in the International Journal of Community Medicine and Public Health found that psychological IPV had a prevalence rate of:",
    options: [
      "31.0%",
      "61.2%",
      "67.2%",
      "74.0%"
    ],
    correctOptionIndex: 2,
    explanation: "Psychological IPV had the highest prevalence of 67.2% in Oyo State, as researched by Ajibola et al., 2017.",
    pdfSection: "Module Two: Domestic Violence - Oyo State Research (Page 6)"
  },
  {
    id: 6,
    pdfModule: 1,
    text: "What percentage of men, prior to the survey cited in the manual, had perpetrated one form of Intimate Partner Violence (IPV) or the other?",
    options: [
      "Almost one-quarter (24%)",
      "Almost half (48%)",
      "Almost three-quarters (74%)",
      "Almost all (95%)"
    ],
    correctOptionIndex: 2,
    explanation: "The tutorial sheet states that 'Almost three-quarter (74%) of men had perpetrated one form of IPV or the other prior to the survey.'",
    pdfSection: "Module Two: Domestic Violence - Perpetration Stats (Page 6)"
  },
  {
    id: 7,
    pdfModule: 1,
    text: "Which of the following is categorized specifically as 'Passive or covert abuse' in HEE117?",
    options: [
      "Slapping, kicking, and throwing objects",
      "Controlling or domineering behavior",
      "Marital rape and choking",
      "Neglect and economic deprivation"
    ],
    correctOptionIndex: 3,
    explanation: "Passive or covert abuse is defined with examples such as neglect and economic deprivation.",
    pdfSection: "Domestic Violence - Forms of Abuse (Page 1)"
  },
  {
    id: 8,
    pdfModule: 1,
    text: "Urban violence is defined as city riots that are spontaneous outbursts of group hostility. According to the National Crime Victimization Survey (NCVS), by what percentage did urban violent crime rise between 2020 and 2021?",
    options: [
      "12 percent",
      "19 percent",
      "29 percent",
      "42 percent"
    ],
    correctOptionIndex: 2,
    explanation: "According to the NCVS, violent crime in urban areas rose to 29 percent from 2020 to 2021, shifting from 19.0 to 24.5 victimizations per 1,000 persons aged 12 or older.",
    pdfSection: "Module Three: Urban Violence - Prevalence (Page 9)"
  },
  {
    id: 9,
    pdfModule: 1,
    text: "The NCVS found that the violent-crime rate in urban areas from 2018 through 2020 was ______ higher than the rate in rural areas.",
    options: [
      "Between 5% and 15%",
      "Between 20% and 25%",
      "Between 29% and 42%",
      "Over 60%"
    ],
    correctOptionIndex: 2,
    explanation: "The NCVS found that the violent-crime rate in urban areas was between 29 percent and 42 percent higher than the rate in rural areas.",
    pdfSection: "Module Three: Urban Violence - Rural Comparison (Page 9)"
  },
  {
    id: 10,
    pdfModule: 1,
    text: "In global crime and peace index rankings, Nigeria is ranked ______ among the least peaceful countries in the world.",
    options: [
      "5th",
      "8th",
      "17th",
      "24th"
    ],
    correctOptionIndex: 2,
    explanation: "Nigeria is considered to be a country with a high level of crime, ranking 17th among the least peaceful countries in the world.",
    pdfSection: "Module Three: Urban Violence - Global Rankings (Page 9)"
  },
  {
    id: 11,
    pdfModule: 1,
    text: "Nearly 1.6 million people lost their lives in the year 2000 because of violence. This was the leading cause of death among which age group?",
    options: [
      "Under 12 years",
      "15-44 years",
      "25-60 years",
      "Over 65 years"
    ],
    correctOptionIndex: 1,
    explanation: "Violence was the leading cause of death among individuals aged 15-44 years in 2000, and 90% of those deaths occurred in low- and middle-income countries.",
    pdfSection: "Module Three: Urban Violence - Psycho-social Effects (Page 10)"
  },
  {
    id: 12,
    pdfModule: 1,
    text: "In Latin America, which two countries present the highest rates of homicides, exceeding 30 per 100,000 inhabitants?",
    options: [
      "Brazil and Mexico",
      "Brazil and Venezuela",
      "Colombia and El Salvador",
      "Mexico and Venezuela"
    ],
    correctOptionIndex: 2,
    explanation: "In Latin America, Colombia and El Salvador present the highest rates of homicides (above 30/100,000), while Brazil, Mexico, and Venezuela have rates between 20 and 30.",
    pdfSection: "Module Three: Urban Violence - LatAm Homicides (Page 11)"
  },
  {
    id: 13,
    pdfModule: 1,
    text: "The UN Sustainable Development Goal that addresses urban safety, resilience, and sustainability (critical to ending urban violence) is:",
    options: [
      "SDG 3 (Good Health and Well-being)",
      "SDG 5 (Gender Equality)",
      "SDG 11 (Sustainable Cities and Communities)",
      "SDG 16 (Peace, Justice and Strong Institutions)"
    ],
    correctOptionIndex: 2,
    explanation: "Urban violence is recognized as a severe threat to cities. Establishment of safe, resilient, and sustainable cities is SDG Goal 11 (SDG 11).",
    pdfSection: "Module Three: Urban Violence - SDG Goal (Page 11)"
  },
  {
    id: 14,
    pdfModule: 1,
    text: "Which of the following is NOT classified under the 'Human Factors contributing to Floods' in the HEE117 syllabus?",
    options: [
      "Deforestation",
      "Improper waste disposal",
      "Heavy seasonal rainfall and storm surges",
      "Inadequate drainage and urbanization"
    ],
    correctOptionIndex: 2,
    explanation: "Deforestation, improper waste disposal, and urbanization are human factors. Heavy rainfall and storm surges are natural causes of flooding, not human factors.",
    pdfSection: "Flooding (Page 10/12)"
  },
  {
    id: 15,
    pdfModule: 1,
    text: "What are psychoactive substances, and how do they biologically affect brain function?",
    options: [
      "Chemicals that digest stomach lipids and alter peripheral reflexes",
      "Chemicals that cross the blood-brain barrier and impact the central nervous system",
      "Synthetic nutrients that boost cardiovascular circulation during physical stress",
      "Gases that neutralize olfactory sensors in the presence of legal stimulants"
    ],
    correctOptionIndex: 1,
    explanation: "Psychoactive substances are chemicals that cross the blood-brain barrier and impact the central nervous system (CNS), altering brain function and leading to changes in mood, consciousness, cognition, and behavior.",
    pdfSection: "Psychoactive Substances - Definition (Page 10)"
  },
  {
    id: 16,
    pdfModule: 1,
    text: "Benzodiazepines (such as Xanax and Valium) and Barbiturates belong to which class of psychoactive substances?",
    options: [
      "Stimulants",
      "Depressants",
      "Hallucinogens",
      "Anabolics"
    ],
    correctOptionIndex: 1,
    explanation: "Depressants slow down brain activity, inducing relaxation or sedation. Examples include alcohol, benzodiazepines (e.g., Xanax, Valium), and barbiturates.",
    pdfSection: "Psychoactive Substances - Depressants (Page 11)"
  },
  {
    id: 17,
    pdfModule: 1,
    text: "Lysergic Acid Diethylamide (LSD), psilocybin (magic mushrooms), ketamine, and MDMA (ecstasy) belong to which class of psychoactive substances?",
    options: [
      "Stimulants",
      "Depressants",
      "Hallucinogens",
      "Analgesics"
    ],
    correctOptionIndex: 2,
    explanation: "Hallucinogens induce perceptual and cognitive alterations, alter perceptions, and cause hallucinations. Examples include LSD, psilocybin, ketamine, and MDMA.",
    pdfSection: "Psychoactive Substances - Hallucinogens (Page 11)"
  },
  {
    id: 18,
    pdfModule: 1,
    text: "Which type of pollution specifically names 'aircraft, road traffic, and railways' as common transport-based sources?",
    options: [
      "Air Pollution",
      "Soil Pollution",
      "Noise Pollution",
      "Light Pollution"
    ],
    correctOptionIndex: 2,
    explanation: "Noise pollution is defined as harmful or excessive levels of sound in the environment, with main sources including industrial activities and transport (aircraft, road traffic, railways) alongside urbanization (construction, loudspeakers, nightlife).",
    pdfSection: "Pollution - Noise Pollution (Page 12)"
  },
  {
    id: 19,
    pdfModule: 1,
    text: "Which environmental chemicals are flagged as direct cardiovascular hazard triggers, increasing the risk of heart attacks, stroke, and hypertension?",
    options: [
      "Organic compost runoff",
      "Heavy soil nitrogen levels",
      "Airborne pollutants (fine particulate matter PM2.5, NOx, SO2)",
      "Light pollution rays"
    ],
    correctOptionIndex: 2,
    explanation: "Air pollution effects state that airborne pollutants such as fine particulate matter (PM2.5), nitrogen oxides (NOx), and sulfur dioxide (SO2) increase the risks of heart attacks, strokes, and hypertension.",
    pdfSection: "Pollution - Human Health Effects (Page 13)"
  },
  {
    id: 20,
    pdfModule: 1,
    text: "Thermal pollution causes a direct temperature imbalance in water bodies. According to the syllabus, this excessive heating is caused by what, and what does it alter?",
    options: [
      "Caused by household laundry runoff; alters pH balance",
      "Caused by industrial processes and power plants; alters temperature of aquatic ecosystems affecting aquatic life (fish, crayfish, etc.)",
      "Caused by acid rain; alters oxygen conversion rates in lakes",
      "Caused by oil spills; alters viscosity of rivers"
    ],
    correctOptionIndex: 1,
    explanation: "Thermal pollution is the excessive heating of natural water bodies as a result of industrial processes and power plants. It alters water temperature and affects aquatic organisms like fish and crayfish.",
    pdfSection: "Pollution - Thermal Pollution (Page 13)"
  },

  // --- PDF MODULE 2 (Adolescent Health, STIs, Stress, Pollution & Health) ---
  {
    id: 21,
    pdfModule: 2,
    text: "The word 'adolescent' is coined from which Latin verb, and what is its translation?",
    options: [
      "Latin verb 'adultus', meaning 'to take responsibility'",
      "Latin verb 'adolescere', meaning 'to grow into maturity'",
      "Latin verb 'crescere', meaning 'to develop physical strength'",
      "Latin verb 'pubertis', meaning 'to undergo bodily changes'"
    ],
    correctOptionIndex: 1,
    explanation: "The word adolescent is coined from the Latin verb 'adolescere' meaning 'to grow into maturity'.",
    pdfSection: "Adolescent Health - Etymology (Page 1)"
  },
  {
    id: 22,
    pdfModule: 2,
    text: "In Dr. T.A. Ola's HEE117 manual, what is the defined age range characterizing the adolescent transition period?",
    options: [
      "10 to 15 years",
      "12 to 18 years",
      "13 to 19 years",
      "14 to 21 years"
    ],
    correctOptionIndex: 2,
    explanation: "The manual explicitly defines adolescence as 'A period of physical development, between 13 to 19 years' which bridges the gap between childhood and adulthood.",
    pdfSection: "Adolescent Health - Characteristics (Page 1)"
  },
  {
    id: 23,
    pdfModule: 2,
    text: "Which hormones trigger the structural changes and physical development of adolescents during puberty?",
    options: [
      "Adrenaline and cortisol",
      "Oestrogen and androgen",
      "Progesterone and insulin",
      "Thyroxine and melatonin"
    ],
    correctOptionIndex: 1,
    explanation: "At the beginning of adolescence, puberty sets in and increased levels of hormones (oestrogen and androgen) gradually change the adolescent's body structures.",
    pdfSection: "Adolescent Health - Hormones (Page 1)"
  },
  {
    id: 24,
    pdfModule: 2,
    text: "According to the HEE117 classification of health challenges, which pair of challenges are categorized specifically under MALES?",
    options: [
      "Prostitution and unwanted pregnancy",
      "Masturbation and impotence",
      "Teenage pregnancy and unsafe abortion",
      "Alcoholism and sexual assault"
    ],
    correctOptionIndex: 1,
    explanation: "The HEE117 manual categorizes challenges for Males as STIs, Masturbation, Impotence, Drug abuse, and Drug misuse. Teenage pregnancy, abortion, and prostitution are categorized under Females.",
    pdfSection: "Health Challenges of Adolescents - Male vs Female (Page 1 & 2)"
  },
  {
    id: 25,
    pdfModule: 2,
    text: "What are the social and psychological implications of pre-marital sex listed under 'Social: To both parents and child'?",
    options: [
      "Cardiovascular stroke and kidney damage",
      "Defoliation and light pollution exposure",
      "Anxiety disorder, substance abuse, conduct abuse, and school dropout",
      "Permanent limb deformity and neonatal blindness"
    ],
    correctOptionIndex: 2,
    explanation: "The social implications for both parents and child include anxiety disorder, substance abuse, conduct abuse (being a victim of physical violence), financial challenges, school dropout, and emotional disturbance.",
    pdfSection: "Implications of Premarital Sex - Social (Page 2)"
  },
  {
    id: 26,
    pdfModule: 2,
    text: "Which of the following describes the medical implications of premarital sex for the child as listed in the tutorial?",
    options: [
      "Severe respiratory bronchitis and asthma",
      "Deafness, blindness (neonatal morbidity), neonatal mortality, deformity, low birth weight, and still-birth",
      "Adolescent stress and early loss of memory",
      "Psychosis and cognitive retardation on the father"
    ],
    correctOptionIndex: 1,
    explanation: "Medical implications to the child include low birth weight, still-birth, prematurity, STIs, anaemia, deformity, neonatal mortality, and neonatal morbidity (blindness, deafness, mental retardation).",
    pdfSection: "Implications of Premarital Sex - Medical (Page 3)"
  },
  {
    id: 27,
    pdfModule: 2,
    text: "What is the HEE117 textbook definition of 'Sexuality'?",
    options: [
      "The physical biological gender assigned to a child at birth",
      "The total expression of who we are as human beings",
      "The act of sexual intercourse leading to reproduction",
      "The hormonal balance between oestrogen and androgen in teenagers"
    ],
    correctOptionIndex: 1,
    explanation: "Sexuality is defined in the HEE117 text as 'The total expression of who we are as human beings. It encompasses the psychological development, values, mental attitudes, physical appearance, beliefs, emotions, likes, dislikes and all the ways in which we have been socialized. It involves our entire self-concept which begins at birth through lifetime.'",
    pdfSection: "Sexuality - Definition (Page 3)"
  },
  {
    id: 28,
    pdfModule: 2,
    text: "Who are classified as the primary 'At Risk Persons' for contracting Sexually Transmitted Infections (STIs) based on age criteria?",
    options: [
      "Males aged 12-18 years and Females aged 14-20 years",
      "Males aged 18-34 years and Females aged 16-24 years",
      "Males aged 20-40 years and Females aged 18-30 years",
      "All individuals over state retirement age"
    ],
    correctOptionIndex: 1,
    explanation: "At Risk Persons specifically listed match: Male aged 18 - 34yrs; Female aged 16 - 24yrs, along with travellers, prostitutes, armed service personnel, merchants, and entertainers.",
    pdfSection: "STIs - At Risk Persons (Page 4)"
  },
  {
    id: 29,
    pdfModule: 2,
    text: "Which of the following correctly pairs an STI with its causative agent pathogen type according to the HEE117 manual?",
    options: [
      "Gonorrhoea -> Virus",
      "HIV/AIDS -> Fungus",
      "Trichomoniasis -> Protozoa",
      "Candidiasis -> Bacteria"
    ],
    correctOptionIndex: 2,
    explanation: "The manual lists: Bacteria (Gonorrhoea), Viruses (HIV/AIDS), Fungi (Candidiasis), and Protozoa (Trichomoniasis). Thus, Trichomoniasis paired with Protozoa is correct.",
    pdfSection: "STIs - Types of Pathogens (Page 4)"
  },
  {
    id: 30,
    pdfModule: 2,
    text: "What is the specific causative agent of Gonorrhoea?",
    options: [
      "Trichomonas vaginalis protozoa",
      "Gonococcus bacterium called Neisseria Gonorrhoea",
      "Human Immunodeficiency Virus",
      "Candida albicans fungus"
    ],
    correctOptionIndex: 1,
    explanation: "The causative agent of Gonorrhoea is Gonococcus bacterium called Neisseria Gonorrhoea.",
    pdfSection: "Gonorrhoea - Causative Agent (Page 4)"
  },
  {
    id: 31,
    pdfModule: 2,
    text: "A female patient presents with unpleasant smelling vaginal discharge, itching in and around the vagina, urinary pain with increased frequency, and swelling in the groin. Based on the HEE117 STI sheets, what is the most likely diagnosis?",
    options: [
      "Gonorrhoea",
      "HIV/AIDS",
      "Trichomoniasis",
      "Candidiasis"
    ],
    correctOptionIndex: 2,
    explanation: "These symptoms are the precise symptoms listed for Trichomoniasis: Unpleasant smelling discharge, itching in/around vagina, blood spotting, urinating more than usual with pain, swelling in the groin.",
    pdfSection: "Trichomoniasis - Signs & Symptoms (Page 5)"
  },
  {
    id: 32,
    pdfModule: 2,
    text: "Which of the following is NOT an HIV/AIDS symptom listed on Page 6 of the STI prevention sheets?",
    options: [
      "Weight loss and persistent fever of more than one month",
      "Milky or yellowish penile discharge and swelling in scrotum",
      "Diarrhoea longer than one month and persistent severe fatigue",
      "Swollen glands, constant cough, itchy skin rashes, and mouth ulcers"
    ],
    correctOptionIndex: 1,
    explanation: "Milky or yellowish discharge and scrotal swelling are symptoms of Gonorrhoea, not HIV/AIDS, which is characterized by weight loss, fever, chronic diarrhoea, severe fatigue, constant cough, swollen glands, mouth ulcers, etc.",
    pdfSection: "HIV/AIDS - Signs & Symptoms (Page 6)"
  },
  {
    id: 33,
    pdfModule: 2,
    text: "What is the tutorial definition of 'Stress'?",
    options: [
      "A brain cell deformity caused by improper mental chemical reactions",
      "The total expression of a person's cognitive limits under peer pressure",
      "Any stimulus that disrupts the biological or psychological equilibrium of an organism",
      "The physical pressure placed on cardiovascular walls during intense running"
    ],
    correctOptionIndex: 2,
    explanation: "The manual defines stress as: 'any stimulus that distribute [disrupts] the biological or psychological equilibrium of an organism. It is used to describe many reactions to the demands of modern and complex lifestyles.'",
    pdfSection: "Stress - Definition (Page 7)"
  },
  {
    id: 34,
    pdfModule: 2,
    text: "What are the two mapped sources of stress and how do they differ in HEE117?",
    options: [
      "Primary stress and Secondary stress; separated by hormonal levels",
      "Individual stress (internal conflicts, values, perception of life) and Environmental stress (family, employer, pollution, societal interference with basic needs)",
      "Acute stress and Chronic stress; separated by duration of the symptoms",
      "Physical stress (physical fatigue) and Psychological stress (moral failures)"
    ],
    correctOptionIndex: 1,
    explanation: "Sources of stress are: 1. INDIVIDUAL STRESS (arising from individual interpretation, expectations, expectations, values, expectations, internal conflicts), and 2. ENVIRONMENTAL STRESS (environmental pollution, family, employer, religious organization, society's interference with opportunities to satisfy basic needs).",
    pdfSection: "Stress - Sources of Stress (Page 7)"
  },
  {
    id: 35,
    pdfModule: 2,
    text: "According to GBD 2019 data cited in HEE117, pollution is responsible for how many deaths, and what percentage of deaths globally?",
    options: [
      "1.6 million deaths (5% of all deaths globally)",
      "5.2 million deaths (10% of all deaths globally)",
      "9 million deaths (16% of all deaths globally)",
      "12 million deaths (20% of all deaths globally)"
    ],
    correctOptionIndex: 2,
    explanation: "Pollution is responsible for an estimated 9 million deaths, representing 16% of all deaths globally, according to the Global Burden of Diseases (GBD) 2019.",
    pdfSection: "Pollution and Health - Death Toll Stats (Page 8)"
  },
  {
    id: 36,
    pdfModule: 2,
    text: "What is the 1948 World Health Organisation (WHO) definition of 'Health'?",
    options: [
      "An optimal athletic status of physical stamina and metabolic strength",
      "A state of complete physical, mental, and social well-being of the individual and not merely the absence of disease or infirmity",
      "The organic capability of an immune system to prevent bacterial contamination",
      "The subjective feeling of health security across a normal life expectancy"
    ],
    correctOptionIndex: 1,
    explanation: "WHO in 1948 declared that health is: 'a state of complete physical, mental and social wellbeing of the individual and not merely the absence of disease or infirmity.'",
    pdfSection: "Pollution and Health - WHO Definition (Page 8)"
  },
  {
    id: 37,
    pdfModule: 2,
    text: "What is 'Smog', and what chemical compounds are identified as the major causes of ground-level smog?",
    options: [
      "Smoke + dust; caused by carbon particles and sulfur molecules",
      "Smoke + fog; caused by Volatile Organic Compounds (VOCs) and Nitrogen Oxides (NOx)",
      "Fossil fumes; caused by lead particles and water vapour condensation",
      "Acid particles; caused by ground ozone and carbon monoxide"
    ],
    correctOptionIndex: 1,
    explanation: "Smog is a combination of smoke plus fog. The major causes of Smog are Volatile Organic Compounds (VOCs) and Nitrogen Oxides (NOx) reacting in the air from automotive and industrial sources.",
    pdfSection: "Pollution and Health - Smog (Page 8)"
  },
  {
    id: 38,
    pdfModule: 2,
    text: "According to scientists cited in the health tutorial slide, by how much has the Earth's surface warmed over the past 140 years due to greenhouse gases?",
    options: [
      "About 1° Celsius",
      "About 1° Fahrenheit",
      "About 1.5° Celsius",
      "About 2° Fahrenheits"
    ],
    correctOptionIndex: 1,
    explanation: "The text states: 'Scientists generally agree that the Earth's surface has warmed by about 1° Fahrenheit in the past 140yrs.'",
    pdfSection: "Pollution and Health - Global Warming (Page 9)"
  },
  {
    id: 39,
    pdfModule: 2,
    text: "To avoid CO poisoning, what is the recommended standard maximum concentration threshold of Carbon Monoxide in occupational settings?",
    options: [
      "10ppm",
      "25ppm",
      "50ppm",
      "100ppm"
    ],
    correctOptionIndex: 2,
    explanation: "The recommended maximum occupational standard for carbon monoxide exposure limit is 50ppm.",
    pdfSection: "Pollution and Health - Occupational Safety (Page 10)"
  },
  {
    id: 40,
    pdfModule: 2,
    text: "Which of the following is NOT an environmental control measure specified on Page 10 of HEE117 to prevent pollution hazards?",
    options: [
      "Installing medical scrubbers, filters, and electronic precipitators in factories",
      "Educating farmers with regular health warnings to prevent chemical input runoffs into farm drinking waters",
      "Increasing absolute household combustion of coal to prevent industrial grid overload",
      "Properly cleaning up wastes to prevent rats, dogs, and flies, and burning refuse properly to avoid excessive smoke outbreaks"
    ],
    correctOptionIndex: 2,
    explanation: "Syllabus specifies installing scrubbers/filters/electronic precipitators, educating farmers, and proper waste cleanup. Increasing coal use is opposite to preventing pollution and is not listed as a control measure in HEE117.",
    pdfSection: "Pollution and Health - Solutions (Page 10)"
  }
];
