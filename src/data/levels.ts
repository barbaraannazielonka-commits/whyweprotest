/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FishTankLevelId, HistoricalMovementDossier, DistrictInfo } from '../types/simulation';

export interface LevelConfig {
  id: FishTankLevelId;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  learningGoal: string;
  unlockedMechanics: string[];
  fishTankPrinciple: string;
  initialMetrics: {
    grievance: number;
    solidarity: number;
    fear: number;
    economicPressure: number;
    publicSupport: number;
    repressionLevel: number;
    communityFund: number;
  };
  eventOptions: {
    id: string;
    title: string;
    description: string;
    expectedImpact: string;
    historicalParallel: string;
  }[];
}

export const FISH_TANK_LEVELS: LevelConfig[] = [
  {
    id: 'level1',
    number: 1,
    title: 'The Essential Fish Tank',
    subtitle: 'Grievances, People, and Power',
    description: 'The simplest model of society: people endure daily conditions, unfair decisions create grievances, and those in power choose whether to listen or enforce rules.',
    learningGoal: 'Discover how individual grievances turn into shared concerns, and why protests do not emerge automatically from hardship alone.',
    unlockedMechanics: [
      'Grievance vs. Daily Tolerance',
      'Power Stance: Dialogue vs. Dismissal',
      'Basic Tactic: Petition vs. Gathering'
    ],
    fishTankPrinciple: "A 'fish tank' is a simplified model of a complex system. By stripping away non-essential noise, you can directly see how changing an unfair rule affects citizens' willingness to act, and how authority responses either soothe or escalate tension.",
    initialMetrics: {
      grievance: 45,
      solidarity: 25,
      fear: 35,
      economicPressure: 15,
      publicSupport: 40,
      repressionLevel: 20,
      communityFund: 30
    },
    eventOptions: [
      {
        id: 'event_wage_cut',
        title: 'Municipal Transit Fare Hike & Wage Cap',
        description: 'City Hall decrees a 40% increase in public bus fares while freezing factory wages. Working commuters can barely afford their daily commute to jobs.',
        expectedImpact: 'Grievance spikes in Residential & Factory quarters. Citizens seek common ground.',
        historicalParallel: 'Parallel to early transit tariffs and unequal economic burdens prior to organized boycotts.'
      },
      {
        id: 'event_curfew_order',
        title: 'Public Gathering Restriction Decree',
        description: 'The mayor issues an ordinance declaring that any group of more than five citizens meeting without a permit will face fines.',
        expectedImpact: 'Fear increases, but shared injustice turns quiet dissatisfaction into collective anger.',
        historicalParallel: 'Similar to British Riot Acts and 20th-century municipal gathering restrictions.'
      }
    ]
  },
  {
    id: 'level2',
    number: 2,
    title: 'Rights, Assembly & Speech',
    subtitle: 'The Legal Space to Protest',
    description: 'Protest requires physical and legal room to organize. When the law forbids assembly, citizens must choose between silent obedience, legal petitions, or civil disobedience.',
    learningGoal: 'Understand why civil disobedience occurs when traditional political and legal channels are blocked or biased.',
    unlockedMechanics: [
      'Freedom of Assembly Toggle',
      'Civil Disobedience (Deliberate Law Refusal)',
      'Underground vs. Public Meetings',
      'Legal Court Challenges'
    ],
    fishTankPrinciple: 'In an open society, citizens use permits and legal petitions. In an oppressive system, the law itself is the obstacle. Protest changes from requesting a favor to challenging the legitimacy of the rule.',
    initialMetrics: {
      grievance: 60,
      solidarity: 35,
      fear: 50,
      economicPressure: 20,
      publicSupport: 45,
      repressionLevel: 45,
      communityFund: 40
    },
    eventOptions: [
      {
        id: 'event_permit_denied',
        title: 'Square Demonstration Permit Denied',
        description: 'City administration rejects an application for a peaceful assembly in Freedom Square, citing "disruption to municipal order".',
        expectedImpact: 'Demonstrators face a dilemma: cancel the action or commit civil disobedience.',
        historicalParallel: 'Common obstacle in Birmingham, Alabama (1963) and Suffragette London (1908).'
      },
      {
        id: 'event_sedition_ban',
        title: 'Pamphlet Distribution Declared Illegal',
        description: 'Distributing handbills or literature criticizing government policy is outlawed.',
        expectedImpact: 'Organizers move to churches and underground networks, deepening collective trust.',
        historicalParallel: '1970s South African censorship of anti-apartheid publications.'
      }
    ]
  },
  {
    id: 'level3',
    number: 3,
    title: 'Media, Words & Public Awareness',
    subtitle: 'From Local Issue to National Cause',
    description: 'Protests are not just about the people in the street; they are a message directed at onlookers, bystanders, and the wider world through the lens of the media.',
    learningGoal: 'Analyze how media coverage and visual evidence shape public sympathy, and how censorship can suppress or amplify a cause.',
    unlockedMechanics: [
      'Media Broadcast & Camera Crews',
      'Press Censorship vs. Investigative Exposure',
      'Public Opinion Shift',
      'Visual Evidence (Photos & Video)'
    ],
    fishTankPrinciple: "Protest is communication. If a protest happens and nobody sees it, power can quietly suppress it. When actions are witnessed by millions, onlookers are forced to take a moral stance.",
    initialMetrics: {
      grievance: 65,
      solidarity: 45,
      fear: 40,
      economicPressure: 30,
      publicSupport: 50,
      repressionLevel: 40,
      communityFund: 50
    },
    eventOptions: [
      {
        id: 'event_camera_capture',
        title: 'Press Cameras Capture Police Aggression',
        description: 'News reporters film police batons used against peaceful singing marchers outside the courthouse.',
        expectedImpact: 'Dramatic increase in national public sympathy; pressure mounts on authorities.',
        historicalParallel: 'Bloody Sunday in Selma (1965) and Hector Pieterson photograph in Soweto (1976).'
      },
      {
        id: 'event_press_blackout',
        title: 'State Imposes News Blackout on Local TV',
        description: 'Authorities ban journalists from entering the factory district to conceal spreading worker strikes.',
        expectedImpact: 'Movement must rely on telephone trees and word-of-mouth solidarity.',
        historicalParallel: 'State of Emergency press curbs in 1980s South Africa.'
      }
    ]
  },
  {
    id: 'level4',
    number: 4,
    title: 'Organization & Mobilizing Structures',
    subtitle: 'Why Courage Alone is Not Enough',
    description: 'Spontaneous anger rarely sustains a movement. Successful movements rely on community organizations, strike funds, carpool logistics, and nonviolent discipline.',
    learningGoal: 'Explain why organization, logistics, and solidarity networks are necessary to overcome fear and the economic costs of protesting.',
    unlockedMechanics: [
      'Community Solidarity Fund',
      'Carpool & Mutual Aid Logistics',
      'Nonviolent Discipline Training',
      'Cross-Community Coalition Building'
    ],
    fishTankPrinciple: 'Protesting has real costs: missing work means losing wages; walking miles to work causes exhaustion. Without mobilizing structures (churches, unions, student networks), movements collapse under physical and economic strain.',
    initialMetrics: {
      grievance: 70,
      solidarity: 55,
      fear: 35,
      economicPressure: 55,
      publicSupport: 55,
      repressionLevel: 50,
      communityFund: 65
    },
    eventOptions: [
      {
        id: 'event_carpool_system',
        title: 'Launching the Volunteer Transit Fleet',
        description: 'Community churches organize 300 private car owners and station wagons to transport workers during the transit boycott.',
        expectedImpact: 'Boycott sustainability jumps dramatically; workers can hold out for months.',
        historicalParallel: 'The Montgomery Improvement Association transportation system in 1955-1956.'
      },
      {
        id: 'event_insurance_cancellation',
        title: 'City Cancels Carpool Insurance Policies',
        description: 'Under pressure from the mayor, local insurance agencies revoke coverage on all volunteer carpool vehicles.',
        expectedImpact: 'Tests organizational resilience; leaders must secure Lloyd’s of London overseas coverage.',
        historicalParallel: 'Direct historical counter-move by Montgomery officials against MIA carpools.'
      }
    ]
  },
  {
    id: 'level5',
    number: 5,
    title: 'The Repression Paradox & Negotiation',
    subtitle: 'How Power Responds',
    description: 'When protests grow, those in power face a strategic choice: grant concessions, try divide-and-rule, or deploy force. But excessive force often triggers the "Backfire Effect".',
    learningGoal: 'Discover why harsh repression can either crush a disorganized movement or dramatically empower a disciplined, legitimate one.',
    unlockedMechanics: [
      'Repression Paradox (The Backfire Effect)',
      'Substantive Concessions vs. Token Compromise',
      'Elite Division (Business vs. Hardline Politicians)',
      'Sustained Economic Leverage'
    ],
    fishTankPrinciple: 'When a government responds with brutality against nonviolent citizens, it exposes its own injustice. This alienates neutral citizens, divides the ruling elite, and invites external pressure.',
    initialMetrics: {
      grievance: 80,
      solidarity: 70,
      fear: 45,
      economicPressure: 70,
      publicSupport: 65,
      repressionLevel: 65,
      communityFund: 75
    },
    eventOptions: [
      {
        id: 'event_backfire_crackdown',
        title: 'Mass Arrest of Respected Community Elders',
        description: 'Police arrest 90 community pastors, teachers, and student leaders on charges of "unlawful conspiracy".',
        expectedImpact: 'Backfire! Rather than terrifying the public, thousands flock to the courthouse to turn themselves in voluntarily.',
        historicalParallel: 'February 1956 mass indictment of Montgomery leaders, which galvanized national support.'
      },
      {
        id: 'event_business_revolt',
        title: 'Chamber of Commerce Urges Settlement',
        description: 'Downtown retail merchants report a 45% decline in holiday sales due to the ongoing boycott and plead with the city council to compromise.',
        expectedImpact: 'Splits the opposition; economic leverage forces negotiations.',
        historicalParallel: 'Merchant pressure in 1963 Birmingham and 1956 Montgomery downtown.'
      }
    ]
  },
  {
    id: 'level6',
    number: 6,
    title: 'Historical Movements Laboratory',
    subtitle: 'Real Movements, Real Contexts',
    description: 'Step into real history. Investigate actual historical movements across the US, UK, and South Africa. Test your understanding on authentic conditions, decisions, and outcomes.',
    learningGoal: 'Synthesize the social, economic, and political forces behind historic movements, explaining why people took action and what changed.',
    unlockedMechanics: [
      'Authentic Historical Case Studies',
      'Multi-Perspective Historical Personas',
      'Cause & Effect Linguistic Synthesis',
      'Historical Investigation Dossier'
    ],
    fishTankPrinciple: 'No single strategy works everywhere. The Montgomery boycott required economic discipline and legal backing; the Suffragettes used public spectacle and wartime national service; the Soweto youth challenged apartheid language oppression. Context determines the outcome.',
    initialMetrics: {
      grievance: 85,
      solidarity: 75,
      fear: 40,
      economicPressure: 60,
      publicSupport: 60,
      repressionLevel: 60,
      communityFund: 70
    },
    eventOptions: [
      {
        id: 'event_montgomery_spark',
        title: 'The Refusal of Rosa Parks (Montgomery, 1955)',
        description: 'Rosa Parks, a respected seamstress and NAACP secretary, is arrested for refusing to surrender her bus seat to a white passenger.',
        expectedImpact: 'Grievance crystallizes around a clear symbol of dignity; triggers a 381-day boycott.',
        historicalParallel: 'Montgomery, Alabama, December 1, 1955.'
      },
      {
        id: 'event_soweto_decree',
        title: 'The Afrikaans Medium Decree (Soweto, 1976)',
        description: 'The South African apartheid government mandates that Black high school students be taught mathematics and social studies in Afrikaans.',
        expectedImpact: 'Violent refusal of forced second-class education; 10,000 students march peacefully.',
        historicalParallel: 'June 16, 1976, Soweto student uprising.'
      }
    ]
  }
];

export const HISTORICAL_DOSSIERS: Record<string, HistoricalMovementDossier> = {
  montgomery: {
    id: 'montgomery',
    title: 'The Montgomery Bus Boycott',
    subtitle: 'Economic Discipline, Solidarity, and Civil Rights',
    year: '1955 – 1956',
    location: 'Montgomery, Alabama, USA',
    bannerTag: 'Civil Rights Movement',
    historicalFactSheet: {
      whatWasProtestedAgainst: 'Racial segregation on public municipal buses under Alabama Jim Crow laws, which required Black passengers to sit in the rear, stand when white sections filled, and face daily humiliation by bus drivers.',
      whyActionWasTaken: 'Decades of quiet petitions had produced zero change. When Rosa Parks (and previously 15-year-old Claudette Colvin) was arrested for refusing to surrender her seat on December 1, 1955, the Women’s Political Council, Rosa Parks, and local pastors united to take direct nonviolent action.',
      methodsUsed: [
        '381-day comprehensive economic boycott of city buses by ~40,000 residents',
        'Elaborate nonviolent carpool network with 300 private vehicles and 40 dispatch stations',
        'Mass church meetings to maintain morale, spiritual resilience, and strategic discipline',
        'Federal constitutional court challenge (Browder v. Gayle) attacking segregation laws directly'
      ],
      powerResponse: 'City officials used intimidation: police ticketed carpool drivers, insurance companies cancelled policies under pressure, Dr. Martin Luther King Jr.’s house was bombed, and 90 organizers were arrested for "conspiracy to interfere with business".',
      whatChangedAsResult: 'The bus company lost ~75% of its ridership and teetered on bankruptcy. On November 13, 1956, the US Supreme Court affirmed that bus segregation was unconstitutional. On December 21, 1956, integrated buses rolled through Montgomery.',
      socialChangeLesson: 'Protest succeeded not merely because people were angry, but because they paired economic leverage (withholding money) with alternative community infrastructure (carpools) and legal constitutional strategy.'
    },
    keyFigures: [
      {
        name: 'Rosa Parks',
        role: 'Seamstress & NAACP Officer',
        quote: 'People always say that I didn’t give up my seat because I was tired, but that isn’t true. I was not tired physically... No, the only tired I was, was tired of giving in.'
      },
      {
        name: 'Dr. Martin Luther King Jr.',
        role: 'President of Montgomery Improvement Association',
        quote: 'We have no alternative but to protest. For many years we have shown an amazing patience. But we come here tonight to be saved from that patience that makes us patient with anything less than freedom.'
      },
      {
        name: 'Jo Ann Robinson',
        role: 'President, Women’s Political Council',
        quote: 'We had planned the boycott for months. When Mrs. Parks was arrested, we printed 52,000 mimeographed leaflets overnight calling on every Black resident to stay off the buses.'
      }
    ],
    timeline: [
      { yearOrMonth: 'Dec 1, 1955', event: 'Rosa Parks arrested', significance: 'The catalyst event that galvanized existing community networks.' },
      { yearOrMonth: 'Dec 5, 1955', event: 'First day of boycott is 99% effective', significance: 'Proves unity; community votes unanimously to continue indefinitely.' },
      { yearOrMonth: 'Jan 30, 1956', event: 'MLK’s home bombed', significance: 'Dr. King calms an armed crowd, insisting on nonviolence and moral discipline.' },
      { yearOrMonth: 'Jun 5, 1956', event: 'Federal District Court rules bus segregation illegal', significance: 'Legal victory in Browder v. Gayle.' },
      { yearOrMonth: 'Dec 20, 1956', event: 'Supreme Court order arrives', significance: 'Boycott ends after 381 days; buses are desegregated.' }
    ],
    systemDynamicsLesson: 'Shows how an individual grievance (one person on a bus) connects to collective organization (carpools and churches), economic power (draining bus revenue), and institutional change (court rulings).'
  },
  suffragettes: {
    id: 'suffragettes',
    title: 'The Suffragette Movement',
    subtitle: 'Deeds Not Words: The Battle for Women’s Vote',
    year: '1903 – 1918',
    location: 'United Kingdom',
    bannerTag: 'Women’s Suffrage',
    historicalFactSheet: {
      whatWasProtestedAgainst: 'The total disenfranchisement of women in parliamentary elections. British women paid taxes and obeyed laws, but had no vote in deciding who made those laws.',
      whyActionWasTaken: 'For fifty years, peaceful constitutional suffragists (NUWSS led by Millicent Fawcett) had presented petitions, held polite rallies, and lobbied MPs, but politicians repeatedly shelved reform bills.',
      methodsUsed: [
        'Mass demonstrations and pageants with distinctive green, white, and violet banners',
        'Direct action and civil disobedience: chaining themselves to railings, interrupting Parliament',
        'Tax resistance ("No taxation without representation")',
        'Hunger strikes in prison to expose the brutality of forced feeding',
        'Suspension of militancy during WWI to work in munitions factories, proving public capability'
      ],
      powerResponse: 'The Liberal government imprisoned over 1,000 women, introduced agonizing forced-feeding through rubber nasal tubes, and passed the "Cat and Mouse Act" (Temporary Discharge for Ill Health Act 1913) to release weakened hunger-strikers and re-arrest them once recovered.',
      whatChangedAsResult: 'The Representation of the People Act 1918 gave women over 30 who met property qualifications the right to vote. In 1928, the Equal Franchise Act granted all women the vote on the same terms as men (age 21).',
      socialChangeLesson: 'Demonstrates the dynamic between moderate constitutional lobbying (NUWSS) and radical spectacle (WSPU). While militant tactics drew intense controversy, they made the issue impossible to ignore, while women’s wartime work cemented public respect.'
    },
    keyFigures: [
      {
        name: 'Emmeline Pankhurst',
        role: 'Founder of WSPU (Suffragettes)',
        quote: 'We are here, not because we are law-breakers; we are here in our efforts to become law-makers.'
      },
      {
        name: 'Millicent Fawcett',
        role: 'President of NUWSS (Suffragists)',
        quote: 'Courage calls to courage everywhere, and its voice cannot be denied. We must be steadfast, peaceful, and constitutional.'
      },
      {
        name: 'Emily Wilding Davison',
        role: 'Militant Activist',
        quote: 'Deeds, not words. The true baptism of our cause is the willingness to sacrifice everything for human equality.'
      }
    ],
    timeline: [
      { yearOrMonth: 'Oct 1903', event: 'WSPU founded in Manchester', significance: 'Adopts the slogan "Deeds, not Words" to break decades of parliamentary inaction.' },
      { yearOrMonth: 'Jun 1908', event: 'Hyde Park Rally of 300,000', significance: 'Largest political gathering in British history to that date.' },
      { yearOrMonth: 'Jul 1909', event: 'First hunger strike in Holloway Prison', significance: 'Transforms prison from punishment into a front line of moral confrontation.' },
      { yearOrMonth: 'Apr 1913', event: 'Cat and Mouse Act enacted', significance: 'State attempts to stop hunger strike deaths without granting concessions.' },
      { yearOrMonth: 'Feb 1918', event: 'Representation of the People Act passed', significance: '8.4 million British women gain the parliamentary franchise.' }
    ],
    systemDynamicsLesson: 'Shows how public spectacle forces a sidelined issue onto the national agenda, and how state repression (forced feeding) can turn public revulsion against the government.'
  },
  soweto: {
    id: 'soweto',
    title: 'The Soweto Youth Uprising',
    subtitle: 'Language, Education, and the Defiance of Apartheid',
    year: '1976',
    location: 'Soweto, Johannesburg, South Africa',
    bannerTag: 'Anti-Apartheid Struggle',
    historicalFactSheet: {
      whatWasProtestedAgainst: 'The Afrikaans Medium Decree of 1974, which forced Black high schools to teach major subjects (math, geography, social studies) in Afrikaans—the language of the white minority oppressor—and the Bantu Education system designed to keep Black Africans in servitude.',
      whyActionWasTaken: 'Black students recognized that forcing them to learn in Afrikaans would cause massive failure rates and block all university and professional opportunities. Peaceful memorandums by teachers and parents were dismissed with arrogance.',
      methodsUsed: [
        'Peaceful student-organized march of 10,000 to 20,000 youths carrying hand-painted cardboard signs',
        'Boycott of classes and examinations across Soweto secondary schools',
        'Solidarity with worker stay-aways (migrant workers refusing to go into Johannesburg)',
        'Creation of the Soweto Students Representative Council (SSRC)'
      ],
      powerResponse: 'Police confronted unarmed singing school children with live ammunition and tear gas. Between 176 and 700 youths (including 12-year-old Hector Pieterson) were killed. Thousands were detained, tortured, or forced into exile.',
      whatChangedAsResult: 'The government rescinded the Afrikaans Medium Decree within weeks, but the uprising catalyzed a permanent shift: thousands of youth joined the armed struggle (MK), the UN Security Council passed Resolution 392 condemning the massacre, and the international anti-apartheid sanctions movement gained unstoppable momentum.',
      socialChangeLesson: 'When state power uses extreme violence against innocent school children, it destroys its own international legitimacy. Soweto shattered the illusion of apartheid stability and marked the beginning of the end of the regime.'
    },
    keyFigures: [
      {
        name: 'Teboho "Dan" Montsitsi',
        role: 'Student Leader, Soweto Student Council',
        quote: 'We were not fighting for guns or overthrowing the state that morning. We were fighting for our right to be educated in our own dignity.'
      },
      {
        name: 'Hector Pieterson (Posthumous)',
        role: '12-Year-Old Schoolboy',
        quote: 'Photograph by Sam Nzima showing Hector dying in the arms of Mbuyisa Makhubo shocked the conscience of the entire planet.'
      },
      {
        name: 'Winnie Madikizela-Mandela',
        role: 'Community Organizer & Activist',
        quote: 'The youth took the struggle from the hands of the defeated elders and lit a fire across all of Azania.'
      }
    ],
    timeline: [
      { yearOrMonth: '1974', event: 'Afrikaans Medium Decree issued', significance: 'Planting the seed of acute educational grievance.' },
      { yearOrMonth: 'Jun 16, 1976', event: 'Soweto student march fired upon', significance: 'Police kill unarmed youths; photograph sent across global news wires.' },
      { yearOrMonth: 'Jun 19, 1976', event: 'UN Security Council passes Resolution 392', significance: 'Global diplomatic condemnation of South African police brutality.' },
      { yearOrMonth: 'Jul 1976', event: 'Afrikaans decree repealed', significance: 'Direct concession won, but student revolt expands into nationwide liberation struggle.' }
    ],
    systemDynamicsLesson: 'Shows how cultural and educational oppression sparks intense resistance among youth, and how media imagery can turn local police brutality into global economic and diplomatic sanctions.'
  },
  polltax: {
    id: 'polltax',
    title: 'The Anti-Poll Tax Rebellion',
    subtitle: 'Mass Non-Payment and the Fall of a Prime Minister',
    year: '1989 – 1990',
    location: 'United Kingdom',
    bannerTag: 'Tax & Economic Justice',
    historicalFactSheet: {
      whatWasProtestedAgainst: 'The "Community Charge" (popularly called the Poll Tax), introduced by Prime Minister Margaret Thatcher. Unlike the old system based on property values, every adult was forced to pay the exact same flat amount, regardless of income: a millionaire paid the exact same as an unemployed nurse.',
      whyActionWasTaken: 'Working-class families saw their local tax bills double or triple overnight. Millions simply did not have the money to pay, creating intense feelings of economic injustice across communities.',
      methodsUsed: [
        'Mass non-payment campaign: over 17 million people refused to pay the tax or delayed payment',
        'Neighborhood Anti-Poll Tax Unions that disrupted bailiffs and court hearings',
        'National mass demonstration of over 200,000 people in Trafalgar Square, London',
        'Disruption of local council meetings and refusal to register on poll tax rolls'
      ],
      powerResponse: 'The government insisted "no turning back", jailed hundreds of non-payers, and deployed heavy police cordons in central London, leading to violent clashes in Trafalgar Square on March 31, 1990.',
      whatChangedAsResult: 'The tax was utterly uncollectable, costing councils more to enforce than it raised. Conservative MPs panicked about losing their seats in general elections. Margaret Thatcher was forced to resign in November 1990; her successor John Major promptly abolished the Poll Tax and replaced it with the graduated Council Tax.',
      socialChangeLesson: 'Demonstrates the power of mass non-compliance. When millions of ordinary citizens refuse to obey a law because it violates basic concepts of fairness, state enforcement institutions (courts, bailiffs, prisons) become overwhelmed and collapse under their own weight.'
    },
    keyFigures: [
      {
        name: 'Margaret Thatcher',
        role: 'Prime Minister of the UK',
        quote: 'The Community Charge is the flagship of the Thatcher fleet. We will not be deflected by protestors.'
      },
      {
        name: 'Steve Nally',
        role: 'All-Britain Anti-Poll Tax Federation',
        quote: 'Can’t pay, won’t pay! You can jail a hundred of us, you can jail a thousand, but you cannot jail seventeen million people.'
      }
    ],
    timeline: [
      { yearOrMonth: 'Apr 1989', event: 'Poll Tax introduced first in Scotland', significance: 'Scots pioneer mass non-payment strategy and community defense unions.' },
      { yearOrMonth: 'Apr 1990', event: 'Poll Tax introduced in England and Wales', significance: 'Millions receive bills they cannot afford.' },
      { yearOrMonth: 'Mar 31, 1990', event: 'Trafalgar Square demonstration of 200,000+', significance: 'Massive mobilization shows the depth of public anger.' },
      { yearOrMonth: 'Nov 1990', event: 'Thatcher resigns as Prime Minister', significance: 'Conservative party deposes leader primarily due to the electoral catastrophe of the tax.' },
      { yearOrMonth: 'Mar 1991', event: 'Poll Tax abolished', significance: 'Replaced by banded property Council Tax.' }
    ],
    systemDynamicsLesson: 'Shows how unfair economic burdens uniting broad segments of the public can render a law mathematically and administratively impossible to enforce.'
  },
  vietnam: {
    id: 'vietnam',
    title: 'Vietnam War Moratorium & Campus Protests',
    subtitle: 'Conscription, Televised War, and Counter-Culture',
    year: '1968 – 1970',
    location: 'United States',
    bannerTag: 'Anti-War Movement',
    historicalFactSheet: {
      whatWasProtestedAgainst: 'US military involvement in the Vietnam War, military conscription (the draft) compelling 18-year-old young men to fight, and carpet bombing campaigns in Southeast Asia.',
      whyActionWasTaken: 'Nightly television broadcasts showed body bags and devastated villages, contrasting with optimistic official government claims. As draft calls climbed, student deferments ended, making youth directly subject to life-or-death decisions made by older politicians.',
      methodsUsed: [
        'Moratorium Day (Oct 15, 1969): 2 million people nationwide held teach-ins, work stoppages, and vigils',
        'Draft card burning and refusing induction into the armed forces',
        'University campus strikes, sit-ins, and building occupations',
        'Veterans returning medals (Vietnam Veterans Against the War)'
      ],
      powerResponse: 'President Nixon claimed the "Silent Majority" supported the war, denounced student protesters, and the FBI launched COINTELPRO to infiltrate groups. On May 4, 1970, National Guardsmen shot and killed 4 students at Kent State University.',
      whatChangedAsResult: 'The Kent State killings triggered a nationwide strike closing 450 universities. Public opinion swung decisively against the war; the 26th Amendment lowered the voting age to 18 ("Old enough to fight, old enough to vote"), the draft was ended in 1973, and US troops were fully withdrawn in 1973.',
      socialChangeLesson: 'Shows how direct personal stake (the draft) combined with unvarnished media coverage to turn public consensus against foreign policy, ultimately forcing constitutional change (the 18-year-old vote).'
    },
    keyFigures: [
      {
        name: 'David Hawk & Sam Brown',
        role: 'Vietnam Moratorium Organizers',
        quote: 'We wanted a protest not just of bearded students, but of businessmen, churchgoers, housewives, and ordinary Americans in every city.'
      },
      {
        name: 'John Kerry',
        role: 'Vietnam Veterans Against the War',
        quote: 'How do you ask a man to be the last man to die for a mistake?'
      }
    ],
    timeline: [
      { yearOrMonth: 'Jan 1968', event: 'Tet Offensive televised', significance: 'Destroys administration credibility that the war was nearly won.' },
      { yearOrMonth: 'Oct 15, 1969', event: 'Moratorium Day', significance: 'Largest coordinated anti-war demonstration in American history.' },
      { yearOrMonth: 'May 4, 1970', event: 'Kent State Shootings', significance: 'Guardsmen kill four students; sparks national general strike across 450 universities.' },
      { yearOrMonth: 'Jul 1971', event: '26th Amendment ratified', significance: 'Voting age lowered to 18.' },
      { yearOrMonth: 'Jan 1973', event: 'Paris Peace Accords & Draft Ended', significance: 'Direct US combat involvement concludes.' }
    ],
    systemDynamicsLesson: 'Highlights how the alignment of veterans, students, and middle-class families shifts public opinion, removing political support for a state policy.'
  }
};

export const INITIAL_DISTRICTS: DistrictInfo[] = [
  {
    id: 'city_hall',
    name: 'City Hall & Governance Plaza',
    tagline: 'Seat of executive ordinances, police dispatch, and legislative power',
    gridCol: 2,
    gridRow: 1,
    primaryGroup: 'Civic Officials & Police Brass',
    baseActivity: 'Issuing decrees, reviewing tax rolls, monitoring municipal order',
    grievance: 15,
    tension: 30,
    organization: 85,
    activeTactics: [],
    citizenName: 'Councilman Robert Vance',
    citizenQuote: 'Our first duty is maintaining order and municipal commerce. If we give in to every assembly, authority ceases to exist.',
    dilemma: 'Balancing political authority against escalating public unrest and media scrutiny.'
  },
  {
    id: 'transit_hub',
    name: 'Central Transit Hub & Bus Depot',
    tagline: 'Artery of daily commuters, bus lines, and commercial mobility',
    gridCol: 1,
    gridRow: 2,
    primaryGroup: 'Working Commuters & Transit Drivers',
    baseActivity: 'Buses departing, daily fares paid, commuters traveling to jobs',
    grievance: 55,
    tension: 40,
    organization: 30,
    activeTactics: [],
    citizenName: 'Evelyn Carter (Commuter)',
    citizenQuote: 'I pay my dime every morning, yet they force me to enter through the back and give up my seat. It is an insult to my human dignity.',
    dilemma: 'If I boycott the bus, I must walk 6 miles to my job. Can our community organize a carpool?'
  },
  {
    id: 'factory_district',
    name: 'Industrial Works & Mill Yards',
    tagline: 'Heavy production, union halls, and working-class livelihood',
    gridCol: 3,
    gridRow: 2,
    primaryGroup: 'Industrial Workers & Shift Laborers',
    baseActivity: 'Smokestacks running, hourly shifts, whistle sounding',
    grievance: 50,
    tension: 35,
    organization: 60,
    activeTactics: [],
    citizenName: 'Thomas Miller (Machinist)',
    citizenQuote: 'We work 12-hour shifts in unsafe heat, and now they cut wages while living costs rise. A strike will hurt our families, but submission hurts us forever.',
    dilemma: 'Striking risks losing our wages and eviction; but without solidarity, conditions will never improve.'
  },
  {
    id: 'university_campus',
    name: 'University Quad & Student Union',
    tagline: 'Youth assembly, political debates, print presses, and teach-ins',
    gridCol: 1,
    gridRow: 1,
    primaryGroup: 'University Students & Young Activists',
    baseActivity: 'Attending lectures, distributing mimeographed flyers, debating politics',
    grievance: 40,
    tension: 45,
    organization: 50,
    activeTactics: [],
    citizenName: 'Maya Lin (Student Council)',
    citizenQuote: 'We study democracy in our textbooks, yet see injustice right outside our campus gates. We have energy, courage, and nothing to lose.',
    dilemma: 'Facing suspension or arrest versus standing up for what is morally right.'
  },
  {
    id: 'residential_quarter',
    name: 'Residential Neighborhoods & Faith Centers',
    tagline: 'Family homes, parish churches, mutual aid networks, and daily life',
    gridCol: 2,
    gridRow: 3,
    primaryGroup: 'Working Families, Elders, and Church Communities',
    baseActivity: 'Cooking meals, evening prayer meetings, organizing community care',
    grievance: 60,
    tension: 25,
    organization: 65,
    activeTactics: [],
    citizenName: 'Reverend James Harris',
    citizenQuote: 'Our church basement holds 500 people. We can pool money for bail, coordinate car rides, and pray for strength to endure without hatred.',
    dilemma: 'Protecting our vulnerable elderly and children while supporting righteous reform.'
  },
  {
    id: 'commercial_avenue',
    name: 'Downtown Commercial Avenue & Shops',
    tagline: 'Department stores, banks, retail counters, and merchants',
    gridCol: 2,
    gridRow: 2,
    primaryGroup: 'Store Owners, Merchants & Shoppers',
    baseActivity: 'Retail commerce, holiday shopping, cash registers ringing',
    grievance: 25,
    tension: 35,
    organization: 40,
    activeTactics: [],
    citizenName: 'Harold Klein (Department Store Owner)',
    citizenQuote: 'I don’t make the city laws, but if people boycott downtown, my registers go empty. I will have to plead with City Hall to negotiate.',
    dilemma: 'Alienating city officials versus facing catastrophic commercial bankruptcy.'
  },
  {
    id: 'freedom_square',
    name: 'Freedom Square & Historic Monument',
    tagline: 'Civic heart, open public space, speeches, and mass assembly',
    gridCol: 3,
    gridRow: 1,
    primaryGroup: 'Public Assemblers, Bystanders, and Press Observers',
    baseActivity: 'Pigeons, fountains, public speeches, pedestrians crossing',
    grievance: 30,
    tension: 20,
    organization: 20,
    activeTactics: [],
    citizenName: 'Sarah Jenkins (Pedestrian)',
    citizenQuote: 'When thousands of people gather peacefully with singing and banners, you cannot look away. It forces you to ask: why are they here?',
    dilemma: 'Should neutral bystanders stay silent or join their neighbors in demanding fairness?'
  },
  {
    id: 'press_broadcast',
    name: 'Press Guild & National News Wire',
    tagline: 'Reporters, television cameras, printing presses, and broadcast antennae',
    gridCol: 3,
    gridRow: 3,
    primaryGroup: 'Photojournalists & Editors',
    baseActivity: 'Writing headlines, developing photography, broadcasting national reports',
    grievance: 20,
    tension: 25,
    organization: 55,
    activeTactics: [],
    citizenName: 'Clara Hughes (Senior Investigative Reporter)',
    citizenQuote: 'Cameras do not take sides, but they do not lie either. When police unleash dogs on schoolchildren, that picture speaks to every dinner table in the world.',
    dilemma: 'Facing state censorship threats versus broadcasting the undeniable truth.'
  }
];
