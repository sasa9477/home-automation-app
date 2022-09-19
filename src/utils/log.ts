import LogLevel from '../models/LogLevel';
import { prismaClient } from './prismaClient';

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
const getCircularReplacer = (() => {
  const seen = new WeakSet();
  return (_: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
})();

function messageWithObject(message: string, obj: any) {
  const objString = JSON.stringify(obj, getCircularReplacer);
  return message + `\n${objString}`;
}

export function logDebug(message: string, paramObject?: object) {
  if (arguments.length == 2) {
    message = messageWithObject(message, paramObject);
  }
  prismaClient.log.create({
    data: {
      logLevel: LogLevel.DEBUG,
      message,
    },
  });
}

export function logInformation(message: string, paramObject?: object) {
  if (arguments.length == 2) {
    message = messageWithObject(message, paramObject);
  }
  prismaClient.log.create({
    data: {
      logLevel: LogLevel.INFO,
      message,
    },
  });
}

export function logWarning(message: string, paramObject?: object) {
  if (arguments.length == 2) {
    message = messageWithObject(message, paramObject);
  }
  prismaClient.log.create({
    data: {
      logLevel: LogLevel.WARN,
      message,
    },
  });
}

export function logError(message: string, paramObject?: object) {
  if (arguments.length == 2) {
    message = messageWithObject(message, paramObject);
  }
  prismaClient.log.create({
    data: {
      logLevel: LogLevel.ERROR,
      message,
    },
  });
}