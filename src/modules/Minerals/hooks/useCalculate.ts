import { Clients } from '../data/clientsData';
import { Crops } from '../data/cropData';
import { Fertilizers } from '../data/fertilizersData';
import type { IClientFormSchema, IManualFormSchema, IResults } from '../types/minerals.types';

const isManualForm = (
  data: IClientFormSchema | IManualFormSchema,
  clientKey?: string,
): data is IManualFormSchema => {
  return !clientKey;
};

export class Calculator {
  fertilizers = {
    nitrogen: {
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      sulfur: 0,
      price: 0,
    },
    phosphorus: {
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      sulfur: 0,
      price: 0,
    },
    potassium: {
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      sulfur: 0,
      price: 0,
    },
  };
  field = {
    crop: {
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
    },
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    area: 0,
    harvest: 0,
  };

  constructor(data: IClientFormSchema | IManualFormSchema, clientKey: string) {
    const isManual = isManualForm(data, clientKey);

    this.fertilizers.nitrogen = {
      ...this.getFertilizerData(data.nitrogen.fertilizer),
      price: data.nitrogen.price,
    };
    this.fertilizers.phosphorus = {
      ...this.getFertilizerData(data.phosphorus.fertilizer),
      price: data.phosphorus.price,
    };
    this.fertilizers.potassium = {
      ...this.getFertilizerData(data.potassium.fertilizer),
      price: data.potassium.price,
    };
    if (isManual) {
      this.field = {
        ...data.field,
        harvest: data.field.harvest * 0.7,
        crop: { ...this.getCropData(data.field.crop) },
        nitrogen: data.nitrogen.soilValue,
        potassium: data.potassium.soilValue,
        phosphorus: data.phosphorus.soilValue,
      };
    } else {
      const fieldData = this.getFieldData(data.field.name, clientKey);
      this.field = {
        ...data.field,
        harvest: data.field.harvest * 0.7,
        ...fieldData,
        crop: { ...this.getCropData(data.field.crop) },
      };
    }
  }

  getFieldData(fieldKey: string, clientKey: string) {
    const client = Clients.find((client) => client.key === clientKey);
    if (!client) throw new Error(`Client with key "${clientKey}" not found`);

    const field = client.fieldsList.find((field) => field.label === fieldKey);
    if (!field) throw new Error(`Field with key "${fieldKey}" not found`);

    return field;
  }

  getFertilizerData(key: string) {
    const fertilizer = Fertilizers.find((fert) => fert.key === key);
    if (!fertilizer) throw new Error(`Fertilizer with key "${key}" not found`);
    return fertilizer;
  }

  getCropData(key: string) {
    const crop = Crops.find((crop) => crop.key === key);
    if (!crop) throw new Error(`Crop with key "${key}" not found`);
    return crop;
  }

  getNPKCoefficients(): {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  } {
    const fieldNitrogen = this.field.nitrogen;
    const fieldPhosphorus = this.field.phosphorus;
    const fieldPotassium = this.field.potassium;

    const nitrogen = fieldNitrogen < 2.9 ? 1 : fieldNitrogen <= 6.2 ? 0.75 : 0.6;

    const phosphorus =
      fieldPhosphorus < 20
        ? 1.3
        : fieldPhosphorus < 25
          ? 1.2
          : fieldPhosphorus < 30
            ? 1.1
            : fieldPhosphorus < 35
              ? 1
              : fieldPhosphorus < 40
                ? 0.9
                : 0.7;

    const potassium =
      fieldPotassium < 6
        ? 1.5
        : fieldPotassium < 7.5
          ? 1.1
          : fieldPotassium < 9
            ? 1.0
            : fieldPotassium < 10.5
              ? 0.9
              : fieldPotassium < 12
                ? 0.8
                : 0.7;

    console.log(
      `Коэффициенты:
		Азот: ${nitrogen}
		Фосфор: ${phosphorus}
		Калий: ${potassium}`,
    );

    return {
      nitrogen: nitrogen,
      phosphorus: phosphorus,
      potassium: potassium,
    };
  }
  createEmptyResult(): IResults {
    return {
      field: { pricePerField: 0, pricePerGa: 0 },
      nitrogen: {
        physWeightPerField: 0,
        physWeightPerGa: 0,
        pricePerField: 0,
        pricePerGa: 0,
      },
      phosphorus: {
        physWeightPerField: 0,
        physWeightPerGa: 0,
        pricePerField: 0,
        pricePerGa: 0,
      },
      potassium: {
        physWeightPerField: 0,
        physWeightPerGa: 0,
        pricePerField: 0,
        pricePerGa: 0,
      },
    };
  }
  calculateDose(result: IResults): IResults {
    const correction = { nitrogen: 1, phosphorus: 1, potassium: 0.8 };
    const coefficients = this.getNPKCoefficients();

    const fertilizerKeys: ['phosphorus', 'nitrogen', 'potassium'] = [
      'phosphorus',
      'nitrogen',
      'potassium',
    ];
    fertilizerKeys.forEach((key) => {
      let dose = coefficients[key] * this.field.harvest * this.field.crop[key];

      if (key !== 'phosphorus') {
        dose -=
          ((this.fertilizers.phosphorus[key] ?? 0) * (result.phosphorus.physWeightPerGa ?? 0)) /
          100;
      }
      result[key].physWeightPerGa =
        Math.round((((dose * 100) / this.fertilizers[key][key]) * correction[key]) / 5) * 5;
      result[key].physWeightPerField = Math.round(
        (result[key].physWeightPerGa / 1000) * this.field.area,
      );
    });
    console.log('result1', result);
    return result;
  }
  calculatePrice(result: IResults): IResults {
    const fertilizerKeys: ['phosphorus', 'nitrogen', 'potassium'] = [
      'phosphorus',
      'nitrogen',
      'potassium',
    ];

    fertilizerKeys.forEach((key) => {
      result[key].pricePerGa = Math.round(
        result[key].physWeightPerGa * this.fertilizers[key].price,
      );
      result[key].pricePerField = result[key].pricePerGa * this.field.area;
    });

    result.field.pricePerGa =
      result.nitrogen.pricePerGa + result.phosphorus.pricePerGa + result.potassium.pricePerGa;

    result.field.pricePerField =
      result.nitrogen.pricePerField +
      result.phosphorus.pricePerField +
      result.potassium.pricePerField;
    return result;
  }

  calculate(): IResults {
    console.log('input', this);

    let result: IResults = this.createEmptyResult();
    result = this.calculateDose(result);
    console.log('result1', result);
    result = this.calculatePrice(result);

    return result;
  }
}
