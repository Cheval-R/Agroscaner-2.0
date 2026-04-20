export interface IManualFormSchema {
  nitrogen: {
    soilValue: string;
    fertilizer: string;
    price: string;
  };
  phosphorus: {
    soilValue: string;
    fertilizer: string;
    price: string;
  };
  potassium: {
    soilValue: string;
    fertilizer: string;
    price: string;
  };
  field: {
    area: string;
    crop: string;
    harvest: string;
  };
}

export interface IClientFormSchema {
  field: {
    name: string;
    area: string;
    crop: string;
    harvest: string;
  };

  nitrogen: {
    fertilizer: string;
    price: string;
  };
  phosphorus: {
    fertilizer: string;
    price: string;
  };
  potassium: {
    fertilizer: string;
    price: string;
  };
}
