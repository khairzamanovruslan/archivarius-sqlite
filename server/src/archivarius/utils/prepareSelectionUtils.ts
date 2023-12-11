
export const prepareSelectionUtils = async (selection: string) => {
    const selection1 = selection.split("<option ");
    const selection2 = selection1.filter((item, index) => index !== 0);
    const selection3 = selection2.map((item) => item.slice(0, -8));
    const selection4 = selection3.map((item, index) => {
        if (index === 0) {
            return {
                id: 0,
                title: item.substring(
                    item.lastIndexOf(">") + 1,
                    item.lastIndexOf("<")
                ),
                flag: "selected"
            }
        } else {
            return {
                id: item.substring(
                    item.lastIndexOf("=") + 2,
                    item.lastIndexOf(">") - 1
                ),
                title: item.substring(
                    item.lastIndexOf(">") + 1,
                    item.lastIndexOf("<")
                ),
                flag: false
            }
        }
    })
    return selection4;
}