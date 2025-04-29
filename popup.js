document.getElementById("fillForm").addEventListener("click", () => {
    const selectedOption = document.getElementById("option").value;
    const comment = document.getElementById("comment").value;

    // Execute script in the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: autoFillForm,
            args: [selectedOption, comment],
        });
    });
});

// Function to fill and submit the form
function autoFillForm(selectedOption, comment) {
    // Select all radio buttons with matching text
    const radioButtons = document.querySelectorAll("md-radio-button");
    radioButtons.forEach((radio) => {
        const label = radio.getAttribute("aria-label");
        if (label === selectedOption) {
            radio.click();
        }
    });

    // Write comment into text area
    const textArea = document.querySelector("textarea");
    if (textArea) {
        textArea.value = comment;
    }

    // Enable and click the "Save" button
    const saveButton = document.querySelector('button[ng-click="Save()"]');
    if (saveButton) {
        saveButton.removeAttribute("disabled"); // Remove disabled attribute
        saveButton.click(); // Simulate button click
        console.log("Save button clicked successfully!");
    } else {
        console.error("Save button not found!");
    }

    alert("Form filled and submitted successfully!");
}
