export interface Product {
  _id: number;
  _keywords: string[];
  added_countries_tags: string[];
  additives_debug_tags: string[];
  additives_n: number;
  additives_old_n: number;
  additives_old_tags: string[];
  additives_original_tags: string[];
  additives_prev_original_tags: string[];
  additives_tags: string[];
  additives_tags_n: null;
  allergens: string;
  allergens_from_ingredients: string;
  allergens_from_user: string;
  allergens_hierarchy: string[];
  allergens_imported: string;
  allergens_tags: string[];
  amino_acids_prev_tags: [];
  amino_acids_tags: [];
  brand_owner: string;
  brand_owner_imported: string;
  brands: string;
  brands_tags: string[];
  categories: string;
  categories_hierarchy: string[];
  categories_imported: string;
  categories_lc: string;
  categories_old: string;
  categories_properties: {};
  categories_properties_tags: string[];
  categories_tags: string[];
  category_properties: {};
  checkers_tags: [];
  ciqual_food_name_tags: string[];
  cities_tags: [];
  code: number;
  codes_tags: string[];
  compared_to_category: string;
  complete: number;
  completeness: number;
  correctors_tags: string[];
  countries: string;
  countries_debug_tags: [];
  countries_hierarchy: string[];
  countries_imported: string;
  countries_lc: string;
  countries_tags: string[];
  created_t: number;
  creator: string;
  data_quality_bugs_tags: [];
  data_quality_errors_tags: [];
  data_quality_info_tags: string[];
  data_quality_tags: string[];
  data_quality_warnings_tags: string[];
  data_sources: string;
  data_sources_imported: string;
  data_sources_tags: string[];
  ecoscore_data: {
    adjustments: {
      origins_of_ingredients: {
        aggregated_origins: [
          {
            origin: string;
            percent: number;
          }
        ];
        epi_score: number;
        epi_value: number;
        origins_from_origins_field: string[];
        transportation_scores: { [key: number]: number };
        transportation_values: {
          [key: number]: number;
        };
        values: {
          [key: number]: number;
        };
        warning: string;
      };
      packaging: {
        non_recyclable_and_non_biodegradable_materials: number;
        packagings: [
          {
            ecoscore_material_score: number;
            ecoscore_shape_ratio: number;
            material: string;
            non_recyclable_and_non_biodegradable: string;
            shape: string;
          }
        ];
        score: number;
        value: number;
      };
      production_system: {
        labels: [];
        value: number;
        warning: string;
      };
      threatened_species: {
        ingredient: string;
        value: number;
      };
    };
    agribalyse: {
      agribalyse_food_code: string;
      agribalyse_proxy_food_code: string;
      co2_agriculture: number;
      co2_consumption: number;
      co2_distribution: number;
      co2_packaging: number;
      co2_processing: number;
      co2_total: number;
      co2_transportation: number;
      code: string;
      dqr: string;
      ef_agriculture: number;
      ef_consumption: number;
      ef_distribution: number;
      ef_packaging: number;
      ef_processing: number;
      ef_total: number;
      ef_transportation: number;
      is_beverage: number;
      name_en: string;
      name_fr: string;
      score: number;
    };
    grade: string;
    grades: {
      [key: string]: string;
    };
    missing: {
      labels: number;
      origins: number;
    };
    missing_data_warning: number;
    score: number;
    scores: {
      [key: number]: number;
    };
    status: string;
  };
  ecoscore_grade: string;
  ecoscore_score: number;
  ecoscore_tags: string[];
  editors: string[];
  editors_tags: string[];
  emb_codes: string;
  emb_codes_20141016: string;
  emb_codes_orig: string;
  emb_codes_tags: [];
  entry_dates_tags: string[];
  expiration_date: string;
  food_groups_tags: [];
  fruits_vegetables_nuts_100g_estimate: number;
  generic_name: string;
  generic_name_en: string;
  id: string;
  image_front_small_url: string;
  image_front_thumb_url: string;
  image_front_url: string;
  image_ingredients_small_url: string;
  image_ingredients_thumb_url: string;
  image_ingredients_url: string;
  image_nutrition_small_url: string;
  image_nutrition_thumb_url: string;
  image_nutrition_url: string;
  image_small_url: string;
  image_thumb_url: string;
  image_url: string;
  images: {
    [key: number]: {
      sizes: {
        100: {
          h: number;
          w: number;
        };
        400: {
          h: number;
          w: number;
        };
        full: {
          h: number;
          w: number;
        };
        uploaded_t: string;
        uploader: string;
      };
    };
  };
  informers_tags: string[];
  ingredients: [
    {
      from_palm_oil?: string;
      id?: string;
      percent_estimate?: number;
      percent_max?: number;
      percent_min?: number;
      rank?: number;
      text?: string;
      vegetarian?: string;
      vegan?: string;
      has_sub_ingredients?: string;
    }
  ];
  ingredients_analysis: {
    non_vegan: string[];
    palm_oil: string[];
    vegetarian_status_unknown: string[];
  };
  ingredients_analysis_tags: string[];
  ingredients_debug: string[];
  ingredients_from_or_that_may_be_from_palm_oil_n: number;
  ingredients_from_palm_oil_n: number;
  ingredients_from_palm_oil_tags: [];
  ingredients_hierarchy: string[];
  ingredients_ids_debug: string[];
  ingredients_n: number;
  ingredients_n_tags: string[];
  ingredients_original_tags: string[];
  ingredients_percent_analysis: number;
  ingredients_tags: string[];
  ingredients_text: string;
  ingredients_text_debug: string;
  ingredients_text_en: string;
  ingredients_text_en_imported: string;
  ingredients_text_with_allergens: string;
  ingredients_text_with_allergens_en: string;
  ingredients_that_may_be_from_palm_oil_n: number;
  ingredients_that_may_be_from_palm_oil_tags: [];
  ingredients_with_specified_percent_n: number;
  ingredients_with_specified_percent_sum: number;
  ingredients_with_unspecified_percent_n: number;
  ingredients_with_unspecified_percent_sum: number;
  interface_version_created: string;
  interface_version_modified: string;
  known_ingredients_n: number;
  labels: string;
  labels_hierarchy: string[];
  labels_lc: string;
  labels_old: string;
  labels_tags: string[];
  lang: string;
  languages: {
    [key: string]: number;
  };
  languages_codes: {
    [key: number]: number;
  };
  languages_hierarchy: string[];
  languages_tags: string[];
  last_edit_dates_tags: string[];
  last_editor: string;
  last_image_dates_tags: string[];
  last_image_t: number;
  last_modified_by: string;
  last_modified_t: number;
  lc: string;
  lc_imported: string;
  link: string;
  main_countries_tags: [];
  manufacturing_places: string;
  manufacturing_places_tags: [];
  max_imgid: string;
  minerals_prev_tags: [];
  minerals_tags: [];
  misc_tags: string[];
  new_additives_n: number;
  no_nutrition_data: string;
  nova_group: number;
  nova_group_debug: string;
  nova_group_tags: string[];
  nova_groups: string;
  nova_groups_tags: string[];
  nucleotides_prev_tags: [];
  nucleotides_tags: [];
  nutrient_levels: {
    fat: string;
    salt: string;
    saturated_fat: string;
    sugars: string;
  };
  nutrient_levels_tags: string[];
  nutriments: {
    calcium: number;
    calcium_100g: number;
    calcium_serving: number;
    calcium_unit: string;
    calcium_value: number;
    carbohydrates: number;
    carbohydrates_100g: number;
    carbohydrates_serving: number;
    carbohydrates_unit: string;
    carbohydrates_value: number;
    cholesterol: number;
    cholesterol_100g: number;
    cholesterol_serving: number;
    cholesterol_unit: string;
    cholesterol_value: number;
    energy: number;
    energy_from_fat: number;
    energy_from_fat_100g: number;
    energy_from_fat_serving: number;
    energy_from_fat_unit: string;
    energy_from_fat_value: number;
    energy_kcal: number;
    energy_kcal_100g: number;
    energy_kcal_serving: number;
    energy_kcal_unit: string;
    energy_kcal_value: number;
    energy_100g: number;
    energy_serving: number;
    energy_unit: string;
    energy_value: number;
    fat: number;
    fat_100g: number;
    fat_serving: number;
    fat_unit: string;
    fat_value: number;
    fiber: number;
    fiber_100g: number;
    fiber_serving: number;
    fiber_unit: string;
    fiber_value: number;
    fruits_vegetables_nuts_estimate_from_ingredients_100g: number;
    fruits_vegetables_nuts_estimate_from_ingredients_serving: number;
    iron: number;
    iron_100g: number;
    iron_serving: number;
    iron_unit: string;
    iron_value: number;
    monounsaturated_fat: number;
    monounsaturated_fat_100g: number;
    monounsaturated_fat_serving: number;
    monounsaturated_fat_unit: string;
    monounsaturated_fat_value: number;
    nova_group: number;
    nova_group_100g: number;
    nova_group_serving: number;
    nutrition_score_fr: number;
    nutrition_score_fr_100g: number;
    polyunsaturated_fat: number;
    polyunsaturated_fat_100g: number;
    polyunsaturated_fat_serving: number;
    polyunsaturated_fat_unit: string;
    polyunsaturated_fat_value: number;
    potassium: number;
    potassium_100g: number;
    potassium_serving: number;
    potassium_unit: string;
    potassium_value: number;
    proteins: number;
    proteins_100g: number;
    proteins_serving: number;
    proteins_unit: string;
    proteins_value: number;
    salt: number;
    salt_100g: number;
    salt_serving: number;
    salt_unit: number;
    salt_value: number;
    saturated_fat: number;
    saturated_fat_100g: number;
    saturated_fat_serving: number;
    saturated_fat_unit: string;
    saturated_fat_value: number;
    sodium: number;
    sodium_100g: number;
    sodium_serving: number;
    sodium_unit: string;
    sodium_value: number;
    sugars: number;
    sugars_100g: number;
    sugars_serving: number;
    sugars_unit: string;
    sugars_value: number;
    trans_fat: number;
    trans_fat_100g: number;
    trans_fat_serving: number;
    trans_fat_unit: string;
    trans_fat_value: number;
    vitamin_a: number;
    vitamin_a_100g: number;
    vitamin_a_serving: number;
    vitamin_a_unit: string;
    vitamin_a_value: number;
    vitamin_c: number;
    vitamin_c_100g: number;
    vitamin_c_serving: number;
    vitamin_c_unit: string;
    vitamin_c_value: number;
  };
  nutriscore_data: {
    energy: number;
    energy_points: number;
    energy_value: number;
    fiber: number;
    fiber_points: number;
    fiber_value: number;
    fruits_vegetables_nuts_colza_walnut_olive_oils: number;
    fruits_vegetables_nuts_colza_walnut_olive_oils_points: number;
    fruits_vegetables_nuts_colza_walnut_olive_oils_value: number;
    grade: string;
    is_beverage: number;
    is_cheese: number;
    is_fat: number;
    is_water: number;
    negative_points: number;
    positive_points: number;
    proteins: number;
    proteins_points: number;
    proteins_value: number;
    saturated_fat: number;
    saturated_fat_points: number;
    saturated_fat_ratio: number;
    saturated_fat_ratio_points: number;
    saturated_fat_ratio_value: number;
    saturated_fat_value: number;
    score: number;
    sodium: number;
    sodium_points: number;
    sodium_value: number;
    sugars: number;
    sugars_points: number;
    sugars_value: number;
  };
  nutriscore_grade: string;
  nutriscore_score: number;
  nutriscore_score_opposite: number;
  nutrition_data: string;
  nutrition_data_per: string;
  nutrition_data_per_debug_tags: [];
  nutrition_data_per_imported: string;
  nutrition_data_prepared_per: string;
  nutrition_data_prepared_per_imported: string;
  nutrition_grade_fr: string;
  nutrition_grades: string;
  nutrition_grades_tags: string[];
  nutrition_score_beverage: number;
  nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients: number;
  nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients_value: number;
  origins: string;
  origins_hierarchy: [];
  origins_lc: string;
  origins_old: string;
  origins_tags: [];
  other_nutritional_substances_tags: [];
  packaging: string;
  packaging_hierarchy: string[];
  packaging_lc: string;
  packaging_old: string;
  packaging_old_before_taxonomization: string;
  packaging_tags: string[];
  packagings: [
    {
      material: string;
      shape: string;
    }
  ];
  photographers_tags: string[];
  pnns_groups_1: string;
  pnns_groups_1_tags: string[];
  pnns_groups_2: string;
  pnns_groups_2_tags: string[];
  popularity_key: number;
  product_name: string;
  product_name_debug_tags: [];
  product_name_en: string;
  product_name_en_imported: string;
  product_quantity: number;
  purchase_places: string;
  purchase_places_tags: string[];
  quantity: string;
  removed_countries_tags: [];
  rev: number;
  selected_images: {
    front: {
      display: {
        en: string;
      };
      small: {
        en: string;
      };
      thumb: {
        en: string;
      };
    };
    ingredients: {
      display: {
        en: string;
        fr: string;
      };
      small: {
        en: string;
        fr: string;
      };
      thumb: {
        en: string;
        fr: string;
      };
    };
    nutrition: {
      display: {
        en: string;
        fr: string;
      };
      small: {
        en: string;
        fr: string;
      };
      thumb: {
        en: string;
        fr: string;
      };
    };
  };
  serving_quantity: string;
  serving_size: string;
  serving_size_imported: string;
  sortkey: number;
  sources: [
    {
      fields: string[];
      id: string;
      images: [];
      import_t: number;
      manufacturer: null;
      name: string;
      url: null;
    }
  ];
  sources_fields: {
    org_database_usda: {
      available_date: string;
      fdc_category: string;
      fdc_data_source: string;
      fdc_id: string;
      modified_date: string;
      publication_date: string;
    };
  };
  states: string;
  states_hierarchy: string[];
  states_tags: string[];
  stores: string;
  stores_tags: [];
  traces: string;
  traces_from_ingredients: string;
  traces_from_user: string;
  traces_hierarchy: [];
  traces_tags: [];
  unknown_ingredients_n: number;
  unknown_nutrients_tags: [];
  update_key: string;
  vitamins_prev_tags: [];
  vitamins_tags: [];
  status: number;
  status_verbose: string;
}
