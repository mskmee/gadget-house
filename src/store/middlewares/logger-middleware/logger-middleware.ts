import { Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

const logger: Middleware = createLogger({ collapsed: true });

export { logger };
