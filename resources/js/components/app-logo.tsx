import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square items-center justify-center rounded-md">
                <AppLogoIcon size={32} />
            </div>
            <div className="ml-1 grid flex-1 text-left text-lg">
                <span className="truncate font-kaushan-script leading-tight font-semibold">
                    Tong Fang Clinic
                </span>
            </div>
        </>
    );
}
