import {DataRecord} from "@/hooks/useUsersFetch";

enum ErrorType {
    DeleteCharacter,
    AddCharacter,
    SwapCharacters,
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const getRandomCharacter = (characters: string): string => {
    const index = Math.floor(Math.random() * characters.length);
    return characters[index];
};

const applyError = (data: string, errorType: ErrorType): string => {
    const position = Math.floor(Math.random() * (data.length + 1));
    let newData = data;
    if (typeof data === 'string') {
        switch (errorType) {
            case ErrorType.DeleteCharacter:
                newData =
                    data.slice(0, position) + data.slice(position + 1);
                break;
            case ErrorType.AddCharacter:
                const newCharacter = getRandomCharacter(alphabet);
                newData =
                    data.slice(0, position) + newCharacter + data.slice(position);
                break;
            case ErrorType.SwapCharacters:
                if (position < data.length - 1) {
                    newData =
                        data.slice(0, position) +
                        data[position + 1] +
                        data[position] +
                        data.slice(position + 2);
                }
                break;
        }
    }

    return newData;
};

const generateErrorCount = (errorRate: number): number => {
    const integerPart = Math.floor(errorRate);
    const fractionalPart = errorRate - integerPart;

    let errorCount = integerPart;

    if (Math.random() < fractionalPart) {
        errorCount += 1;
    }

    return errorCount;
};
const applyDigitsError = (value: string): string => {
    const digitsRegex = /\d/g;
    const digits = value.match(digitsRegex);

    if (digits && digits.length > 1) {
        const index1 = Math.floor(Math.random() * digits.length);
        let index2 = Math.floor(Math.random() * digits.length);

        while (index2 === index1) {
            index2 = Math.floor(Math.random() * digits.length);
        }

        const digit1 = digits[index1];
        const digit2 = digits[index2];

        return value.replace(digit1, 'x').replace(digit2, digit1).replace('x', digit2);
    }

    return value;
};
const generateErrorDataRecord = (
    originalData: DataRecord,
    errorRate: number
): DataRecord => {
    const errorCount = generateErrorCount(errorRate);
    let modifiedData: any = {...originalData};

    const fields = [ "name", "address","phoneNumber"]
    const shuffledFields = shuffleArray(fields);

    for (let i = 0; i < errorCount; i++) {
        const field = getRandomField(shuffledFields);
        const errorType = Math.floor(Math.random() * 3);
        const fieldValue = modifiedData[field] as string;

        switch (errorType) {
            case ErrorType.DeleteCharacter:
                modifiedData[field] = applyError(fieldValue, ErrorType.DeleteCharacter);
                break;
            case ErrorType.AddCharacter:
                modifiedData[field] = applyError(fieldValue, ErrorType.AddCharacter);
                break;
            case ErrorType.SwapCharacters:
                if (field === 'phoneNumber') {
                    modifiedData[field] = applyDigitsError(fieldValue);
                } else {
                    modifiedData[field] = applyError(fieldValue, ErrorType.SwapCharacters);
                }
                break;

        }
    }

    return modifiedData;
};
const getRandomField = <T>(array: T[]): T => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};
const shuffleArray = <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};
export const generateErrorDataRecords = (
    originalData: DataRecord[] | undefined,
    errorRate: number
): DataRecord[] | undefined => {
    if (originalData)
        return originalData.map((record) =>
            generateErrorDataRecord(record, errorRate)
        );
};
