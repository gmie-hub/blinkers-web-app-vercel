import { atomWithStorage } from 'jotai/utils';
import { routeParts } from '../routes';
import { BasicInfo, Route, RoutesPart, SocialInfo } from './type';

const basicInfo = JSON.parse(localStorage.getItem('basic-info') ?? '{}');
const socialInfo = JSON.parse(localStorage.getItem('social-info') ?? '{}');
const routes = JSON.parse(localStorage.getItem('routes') ?? '[]');
const routesParts = JSON.parse(localStorage.getItem('route-part') ?? JSON.stringify(routeParts));

export const basicInfoAtom = atomWithStorage<BasicInfo>('basic-info', basicInfo);
export const socialInfoAtom = atomWithStorage<SocialInfo>('social-info', socialInfo);
export const routesArrayAtom = atomWithStorage<Route[]>('routes', routes);
export const routesPartsAtom = atomWithStorage<RoutesPart>('route-part', routesParts);
