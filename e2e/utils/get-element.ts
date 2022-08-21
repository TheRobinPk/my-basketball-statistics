export const getElementByResourceId = async (resourceId: string, driver: any) => {
    const selector = `new UiSelector().resourceId("${resourceId}")`;
    return await driver.$(`android=${selector}`);
};

export const getElementByText = async (text: string, driver: any) => {
    const selector = `new UiSelector().text("${text}")`;
    return await driver.$(`android=${selector}`);
};

export const getElementByClassName = async (className: string, driver: any) => {
    const selector = `new UiSelector().className("${className}")`;
    return await driver.$(`android=${selector}`);
};