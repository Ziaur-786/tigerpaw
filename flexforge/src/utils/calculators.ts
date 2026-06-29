/**
 * Fitness Calculator Utilities
 * All calculations are based on scientific formulas
 */

// BMI Calculator
export interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  recommendation: string;
}

export function calculateBMI(weightKg: number, heightCm: number): BMIResult {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  if (bmi < 18.5) {
    return {
      bmi: Math.round(bmi * 10) / 10,
      category: "Underweight",
      color: "#FFD93D",
      recommendation: "Consider increasing calorie intake with nutrient-dense foods to reach a healthy weight.",
    };
  } else if (bmi < 25) {
    return {
      bmi: Math.round(bmi * 10) / 10,
      category: "Normal weight",
      color: "#00E676",
      recommendation: "Maintain your current healthy weight with balanced nutrition and regular exercise.",
    };
  } else if (bmi < 30) {
    return {
      bmi: Math.round(bmi * 10) / 10,
      category: "Overweight",
      color: "#FF9F43",
      recommendation: "Focus on a moderate calorie deficit and increased physical activity to reach a healthy weight.",
    };
  } else if (bmi < 35) {
    return {
      bmi: Math.round(bmi * 10) / 10,
      category: "Obesity Class I",
      color: "#FF6B6B",
      recommendation: "Consult with a healthcare professional for a personalized weight loss plan.",
    };
  } else if (bmi < 40) {
    return {
      bmi: Math.round(bmi * 10) / 10,
      category: "Obesity Class II",
      color: "#FF3737",
      recommendation: "Strongly recommend consulting with a healthcare professional for medical supervision.",
    };
  } else {
    return {
      bmi: Math.round(bmi * 10) / 10,
      category: "Obesity Class III",
      color: "#FF0000",
      recommendation: "Urgent medical consultation required. Please seek professional healthcare advice.",
    };
  }
}

// BMR Calculator (Mifflin-St Jeor Equation)
export interface BMRResult {
  bmr: number;
  description: string;
}

export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: "male" | "female"
): BMRResult {
  const weight = weightKg;
  const height = heightCm;

  if (gender === "male") {
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    return {
      bmr: Math.round(bmr),
      description: "Your Basal Metabolic Rate (BMR) is the number of calories your body burns at rest.",
    };
  } else {
    const bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    return {
      bmr: Math.round(bmr),
      description: "Your Basal Metabolic Rate (BMR) is the number of calories your body burns at rest.",
    };
  }
}

// TDEE Calculator
export type ActivityLevel = "sedentary" | "lightly" | "moderately" | "very" | "extra";

export interface TDEEResult {
  tdee: number;
  maintenance: number;
  mildLoss: number;
  weightLoss: number;
  extremeLoss: number;
  mildGain: number;
  weightGain: number;
  extremeGain: number;
  description: string;
}

export function calculateTDEE(
  bmr: number,
  activityLevel: ActivityLevel
): TDEEResult {
  const activityMultipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,      // Little or no exercise
    lightly: 1.375,      // Light exercise 1-3 days/week
    moderately: 1.55,    // Moderate exercise 3-5 days/week
    very: 1.725,         // Hard exercise 6-7 days/week
    extra: 1.9,          // Very hard exercise & physical job
  };

  const multiplier = activityMultipliers[activityLevel];
  const tdee = Math.round(bmr * multiplier);

  return {
    tdee,
    maintenance: tdee,
    mildLoss: Math.round(tdee - tdee * 0.1),      // 10% deficit
    weightLoss: Math.round(tdee - tdee * 0.2),     // 20% deficit
    extremeLoss: Math.round(tdee - tdee * 0.3),   // 30% deficit
    mildGain: Math.round(tdee + tdee * 0.1),       // 10% surplus
    weightGain: Math.round(tdee + tdee * 0.2),      // 20% surplus
    extremeGain: Math.round(tdee + tdee * 0.3),    // 30% surplus
    description: `Your Total Daily Energy Expenditure (TDEE) is the total number of calories you burn in a day, including exercise and daily activities.`,
  };
}

// Protein Calculator
export interface ProteinResult {
  proteinG: number;
  proteinKcal: number;
  proteinPerMeal: number;
  description: string;
}

export function calculateProtein(
  weightKg: number,
  activityLevel: ActivityLevel,
  goal: "maintain" | "lose" | "gain" = "maintain"
): ProteinResult {
  let proteinPerKg: number;

  switch (activityLevel) {
    case "sedentary":
      proteinPerKg = goal === "gain" ? 1.6 : goal === "lose" ? 1.4 : 1.2;
      break;
    case "lightly":
      proteinPerKg = goal === "gain" ? 1.8 : goal === "lose" ? 1.6 : 1.4;
      break;
    case "moderately":
      proteinPerKg = goal === "gain" ? 2.0 : goal === "lose" ? 1.8 : 1.6;
      break;
    case "very":
      proteinPerKg = goal === "gain" ? 2.2 : goal === "lose" ? 2.0 : 1.8;
      break;
    case "extra":
      proteinPerKg = goal === "gain" ? 2.4 : goal === "lose" ? 2.2 : 2.0;
      break;
    default:
      proteinPerKg = 1.6;
  }

  const proteinG = Math.round(weightKg * proteinPerKg);
  const proteinKcal = Math.round(proteinG * 4); // 4 calories per gram of protein
  const proteinPerMeal = Math.round(proteinG / 4); // Assuming 4 meals per day

  return {
    proteinG,
    proteinKcal,
    proteinPerMeal,
    description: `Protein intake recommendation based on your weight, activity level, and goal. Protein contains 4 calories per gram.`,
  };
}

// Body Fat Calculator (US Navy Method)
export interface BodyFatResult {
  bodyFat: number;
  fatMass: number;
  leanMass: number;
  category: string;
  color: string;
  description: string;
}

export function calculateBodyFat(
  gender: "male" | "female",
  measurements: {
    neck?: number;
    waist: number;
    hip?: number;
    height: number;
  },
  age: number
): BodyFatResult {
  const { neck = 0, waist, hip = 0, height } = measurements;

  if (gender === "male") {
    // US Navy formula for men: 495 / (1.29579 - 0.35004 * log(waist - neck) + 0.221 * log(height)) - 450
    const logTerm1 = Math.log(waist - neck);
    const logTerm2 = Math.log(height);
    const bodyDensity = 1.29579 - 0.35004 * logTerm1 + 0.221 * logTerm2;
    let bodyFat = 495 / bodyDensity - 450;

    // Adjust for age
    bodyFat += age * 0.1;

    bodyFat = Math.min(Math.max(bodyFat, 3), 50);

    const fatMass = Math.round((bodyFat / 100) * (waist * waist * 0.0249) * 10) / 10; // Estimated weight from waist
    const leanMass = Math.round((1 - bodyFat / 100) * (waist * waist * 0.0249) * 10) / 10;

    if (bodyFat < 6) {
      return {
        bodyFat: Math.round(bodyFat * 10) / 10,
        fatMass,
        leanMass,
        category: "Essential Fat",
        color: "#FFD93D",
        description: "Essential fat is necessary for normal physiological function. Below 6% body fat for men is considered very low.",
      };
    } else if (bodyFat < 14) {
      return {
        bodyFat: Math.round(bodyFat * 10) / 10,
        fatMass,
        leanMass,
        category: "Athletes",
        color: "#00E676",
        description: "This body fat percentage is typically seen in athletes and very fit individuals.",
      };
    } else if (bodyFat < 18) {
      return {
        bodyFat: Math.round(bodyFat * 10) / 10,
        fatMass,
        leanMass,
        category: "Fitness",
        color: "#00E676",
        description: "This is a healthy body fat percentage for active individuals.",
      };
    } else if (bodyFat < 25) {
      return {
        bodyFat: Math.round(bodyFat * 10) / 10,
        fatMass,
        leanMass,
        category: "Average",
        color: "#FF9F43",
        description: "This is within the average range for adult men.",
      };
    } else {
      return {
        bodyFat: Math.round(bodyFat * 10) / 10,
        fatMass,
        leanMass,
        category: "Obese",
        color: "#FF6B6B",
        description: "Body fat percentage above 25% for men is associated with increased health risks.",
      };
    }
  } else {
    // US Navy formula for women: 495 / (1.29579 - 0.35004 * log(waist + hip - neck) + 0.221 * log(height)) - 450
    const logTerm1 = Math.log(waist + hip - neck);
    const logTerm2 = Math.log(height);
    const bodyDensity = 1.29579 - 0.35004 * logTerm1 + 0.221 * logTerm2;
    let bodyFat = 495 / bodyDensity - 450;

    // Adjust for age
    bodyFat += age * 0.1;

    bodyFat = Math.min(Math.max(bodyFat, 10), 55);

    const fatMass = Math.round((bodyFat / 100) * (waist * waist * 0.0249) * 10) / 10;
    const leanMass = Math.round((1 - bodyFat / 100) * (waist * waist * 0.0249) * 10) / 10;

    if (bodyFat < 10) {
      return {
        bodyFat: Math.round(bodyFat * 10) / 10,
        fatMass,
        leanMass,
        category: "Essential Fat",
        color: "#FFD93D",
        description: "Essential fat is necessary for normal physiological function. Below 10% body fat for women can lead to health issues.",
      };
    } else if (bodyFat < 16) {
      return {
        bodyFat: Math.round(bodyFat * 10) / 10,
        fatMass,
        leanMass,
        category: "Athletes",
        color: "#00E676",
        description: "This body fat percentage is typically seen in female athletes.",
      };
    } else if (bodyFat < 21) {
      return {
        bodyFat: Math.round(bodyFat * 10) / 10,
        fatMass,
        leanMass,
        category: "Fitness",
        color: "#00E676",
        description: "This is a healthy body fat percentage for active women.",
      };
    } else if (bodyFat < 28) {
      return {
        bodyFat: Math.round(bodyFat * 10) / 10,
        fatMass,
        leanMass,
        category: "Average",
        color: "#FF9F43",
        description: "This is within the average range for adult women.",
      };
    } else {
      return {
        bodyFat: Math.round(bodyFat * 10) / 10,
        fatMass,
        leanMass,
        category: "Obese",
        color: "#FF6B6B",
        description: "Body fat percentage above 28% for women is associated with increased health risks.",
      };
    }
  }
}

// Water Intake Calculator
export interface WaterResult {
  waterL: number;
  waterMl: number;
  waterOz: number;
  glasses: number; // Assuming 8oz glasses
  description: string;
}

export function calculateWaterIntake(
  weightKg: number,
  activityLevel: ActivityLevel,
  climate: "cold" | "moderate" | "hot" = "moderate"
): WaterResult {
  let waterPerKg: number;

  // Base water intake: 30-35ml per kg of body weight
  switch (activityLevel) {
    case "sedentary":
      waterPerKg = 30;
      break;
    case "lightly":
      waterPerKg = 32;
      break;
    case "moderately":
      waterPerKg = 35;
      break;
    case "very":
      waterPerKg = 38;
      break;
    case "extra":
      waterPerKg = 40;
      break;
    default:
      waterPerKg = 35;
  }

  // Adjust for climate
  switch (climate) {
    case "cold":
      waterPerKg *= 0.9;
      break;
    case "hot":
      waterPerKg *= 1.2;
      break;
    default:
      break;
  }

  const waterMl = Math.round(weightKg * waterPerKg);
  const waterL = Math.round(waterMl / 100);
  const waterOz = Math.round(waterMl * 0.033814);
  const glasses = Math.round(waterOz / 8);

  return {
    waterL,
    waterMl,
    waterOz,
    glasses,
    description: `Daily water intake recommendation based on your weight, activity level, and climate. This is a general guideline; individual needs may vary.`,
  };
}

// Calorie Calculator (based on TDEE)
export interface CalorieResult {
  maintenance: number;
  mildLoss: number;
  weightLoss: number;
  extremeLoss: number;
  mildGain: number;
  weightGain: number;
  extremeGain: number;
  description: string;
}

export function calculateCalories(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: "male" | "female",
  activityLevel: ActivityLevel,
  goal: "maintain" | "lose" | "gain" = "maintain"
): CalorieResult {
  const bmr = calculateBMR(weightKg, heightCm, age, gender).bmr;
  const tdee = calculateTDEE(bmr, activityLevel);

  return {
    maintenance: tdee.maintenance,
    mildLoss: tdee.mildLoss,
    weightLoss: tdee.weightLoss,
    extremeLoss: tdee.extremeLoss,
    mildGain: tdee.mildGain,
    weightGain: tdee.weightGain,
    extremeGain: tdee.extremeGain,
    description: `Calorie recommendations based on your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE).`,
  };
}

// Macros Calculator
export interface MacroResult {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  proteinKcal: number;
  carbsKcal: number;
  fatsKcal: number;
  description: string;
}

export function calculateMacros(
  calories: number,
  proteinRatio: number = 0.3,
  carbsRatio: number = 0.4,
  fatsRatio: number = 0.3
): MacroResult {
  const proteinKcal = Math.round(calories * proteinRatio);
  const carbsKcal = Math.round(calories * carbsRatio);
  const fatsKcal = Math.round(calories * fatsRatio);

  const protein = Math.round(proteinKcal / 4); // 4 calories per gram
  const carbs = Math.round(carbsKcal / 4);    // 4 calories per gram
  const fats = Math.round(fatsKcal / 9);      // 9 calories per gram

  return {
    calories,
    protein,
    carbs,
    fats,
    proteinKcal,
    carbsKcal,
    fatsKcal,
    description: `Macronutrient breakdown based on your calorie goal and chosen macros ratios.`,
  };
}

// One Rep Max Calculator
export interface OneRepMaxResult {
  weight: number;
  reps: number;
  oneRepMax: number;
  description: string;
}

export function calculateOneRepMax(
  weight: number,
  reps: number,
  formula: "brzycki" | "epley" | "lombardi" = "brzycki"
): OneRepMaxResult {
  let oneRepMax: number;

  switch (formula) {
    case "brzycki":
      // Brzycki formula: weight / (1.0278 - 0.0278 * reps)
      oneRepMax = weight / (1.0278 - 0.0278 * reps);
      break;
    case "epley":
      // Epley formula: weight * (1 + reps / 30)
      oneRepMax = weight * (1 + reps / 30);
      break;
    case "lombardi":
      // Lombardi formula: weight * reps ^ 0.10
      oneRepMax = weight * Math.pow(reps, 0.1);
      break;
    default:
      oneRepMax = weight / (1.0278 - 0.0278 * reps);
  }

  return {
    weight,
    reps,
    oneRepMax: Math.round(oneRepMax),
    description: `Estimated one-rep max based on the ${formula} formula. This is an estimate; actual performance may vary.`,
  };
}

// Waist to Height Ratio
export interface WaistToHeightResult {
  ratio: number;
  category: string;
  color: string;
  healthRisk: string;
  recommendation: string;
}

export function calculateWaistToHeight(
  waistCm: number,
  heightCm: number
): WaistToHeightResult {
  const ratio = (waistCm / heightCm) * 100;

  if (ratio < 40) {
    return {
      ratio: Math.round(ratio * 10) / 10,
      category: "Low Risk",
      color: "#00E676",
      healthRisk: "Minimal",
      recommendation: "Maintain your current healthy lifestyle.",
    };
  } else if (ratio < 50) {
    return {
      ratio: Math.round(ratio * 10) / 10,
      category: "Moderate Risk",
      color: "#FFD93D",
      healthRisk: "Low to Moderate",
      recommendation: "Consider making small improvements to your diet and increasing physical activity.",
    };
  } else if (ratio < 60) {
    return {
      ratio: Math.round(ratio * 10) / 10,
      category: "High Risk",
      color: "#FF9F43",
      healthRisk: "Moderate to High",
      recommendation: "You should consult with a healthcare professional and consider a weight loss plan.",
    };
  } else {
    return {
      ratio: Math.round(ratio * 10) / 10,
      category: "Very High Risk",
      color: "#FF6B6B",
      healthRisk: "High",
      recommendation: "Strongly recommend consulting with a healthcare professional for medical advice.",
    };
  }
}

// Waist to Hip Ratio
export interface WaistToHipResult {
  ratio: number;
  category: string;
  color: string;
  healthRisk: string;
  recommendation: string;
}

export function calculateWaistToHip(
  waistCm: number,
  hipCm: number,
  gender: "male" | "female"
): WaistToHipResult {
  const ratio = waistCm / hipCm;

  if (gender === "male") {
    if (ratio < 0.9) {
      return {
        ratio: Math.round(ratio * 100) / 100,
        category: "Low Risk",
        color: "#00E676",
        healthRisk: "Minimal",
        recommendation: "Maintain your current healthy lifestyle.",
      };
    } else if (ratio < 1.0) {
      return {
        ratio: Math.round(ratio * 100) / 100,
        category: "Moderate Risk",
        color: "#FFD93D",
        healthRisk: "Moderate",
        recommendation: "Consider making improvements to your diet and increasing physical activity.",
      };
    } else {
      return {
        ratio: Math.round(ratio * 100) / 100,
        category: "High Risk",
        color: "#FF6B6B",
        healthRisk: "High",
        recommendation: "Consult with a healthcare professional for advice on reducing health risks.",
      };
    }
  } else {
    // Female
    if (ratio < 0.8) {
      return {
        ratio: Math.round(ratio * 100) / 100,
        category: "Low Risk",
        color: "#00E676",
        healthRisk: "Minimal",
        recommendation: "Maintain your current healthy lifestyle.",
      };
    } else if (ratio < 0.85) {
      return {
        ratio: Math.round(ratio * 100) / 100,
        category: "Moderate Risk",
        color: "#FFD93D",
        healthRisk: "Moderate",
        recommendation: "Consider making improvements to your diet and increasing physical activity.",
      };
    } else {
      return {
        ratio: Math.round(ratio * 100) / 100,
        category: "High Risk",
        color: "#FF6B6B",
        healthRisk: "High",
        recommendation: "Consult with a healthcare professional for advice on reducing health risks.",
      };
    }
  }
}

// Ideal Weight Calculator (Hamwi Formula)
export interface IdealWeightResult {
  minWeight: number;
  maxWeight: number;
  description: string;
}

export function calculateIdealWeight(
  heightCm: number,
  gender: "male" | "female"
): IdealWeightResult {
  const heightIn = heightCm / 2.54; // Convert cm to inches

  if (gender === "male") {
    // Hamwi formula for men: 48 kg + 2.7 kg per inch over 152 cm (60 inches)
    const baseWeight = 48;
    const additionalWeight = (heightIn - 60) * 2.7;
    const idealWeight = baseWeight + additionalWeight;

    // Allow for 10% variation
    const minWeight = Math.round(idealWeight * 0.9);
    const maxWeight = Math.round(idealWeight * 1.1);

    return {
      minWeight,
      maxWeight,
      description: `Ideal weight range based on the Hamwi formula. This is a general guideline; individual ideal weights may vary based on body composition and other factors.`,
    };
  } else {
    // Hamwi formula for women: 45.5 kg + 2.2 kg per inch over 152 cm (60 inches)
    const baseWeight = 45.5;
    const additionalWeight = (heightIn - 60) * 2.2;
    const idealWeight = baseWeight + additionalWeight;

    // Allow for 10% variation
    const minWeight = Math.round(idealWeight * 0.9);
    const maxWeight = Math.round(idealWeight * 1.1);

    return {
      minWeight,
      maxWeight,
      description: `Ideal weight range based on the Hamwi formula. This is a general guideline; individual ideal weights may vary based on body composition and other factors.`,
    };
  }
}

// Export all calculator functions
export {
  calculateBMI,
  calculateBMR,
  calculateTDEE,
  calculateProtein,
  calculateBodyFat,
  calculateWaterIntake,
  calculateCalories,
  calculateMacros,
  calculateOneRepMax,
  calculateWaistToHeight,
  calculateWaistToHip,
  calculateIdealWeight,
};
