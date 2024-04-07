import { CombinatorConfig, ValidationParams, ValidationReport } from "../types";
import { buildCombinatorConfigValidationSchema, buildSlotMachineLineValidationSchema } from "./schemas";

function performValidation(params: ValidationParams): ValidationReport {
  const { schema, context } = params;
  const errors: string[] = [];

  for (const item of schema) {
    const { condition, errorMessage } = item;

    if (!condition) errors.push(errorMessage);
  }

  const response: ValidationReport = {
    isValid: true,
    ...(context && { context }),
  };

  if (errors.length > 0) {
    response.isValid = false;
    response.messages = errors;
  }

  return response;
}

export function validateSlotMachineLine(line: number[], config: CombinatorConfig, context?: string): ValidationReport {
  const schema = buildSlotMachineLineValidationSchema(line, config);

  return performValidation({ schema, line, config, context });
}

export function validateCombinatorConfig(config: CombinatorConfig, context?: string): ValidationReport {
  const schema = buildCombinatorConfigValidationSchema(config);

  return performValidation({ schema, config, context });
}
