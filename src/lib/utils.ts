import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MockLoading = async (ms?: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms || 2000))
}

export function convertPrismaResultToPlainObject(prismaResult: any) {
  const plainObject = JSON.parse(JSON.stringify(prismaResult));

  // Recursive function to convert MongoDB date objects
  function convertDates(obj: any) {
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        if ('$date' in obj[key]) {
          obj[key] = new Date(obj[key].$date);
        } else {
          convertDates(obj[key]); // Recursively process nested objects/arrays
        }
      }
    }
  }

  convertDates(plainObject);

  return plainObject;
}
