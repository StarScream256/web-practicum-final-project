import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { AxiosInstance } from 'axios';
import ziggyRoute, { Config as ZiggyConfig } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    /* This tells TypeScript that route() is a global function */
    var route: typeof ziggyRoute;
    var Ziggy: ZiggyConfig;
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, App.PageProps {}
}
