// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let current = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = current[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (item in result){
      panel.append("h6").text(`${item.toUpperCase()}: ${result[item]}`);
    };
  });
};

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let current = samples.filter(sampleObj => sampleObj.id == sample);
    let result = current[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otuIds = result.otu_ids;
    let otuLabels = result.otu_labels;
    let sampleValues = result.sample_values;

    // Build a Bubble Chart
    let bubbleInfo = [
      {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
          size: sampleValues,
          color: otuIds,
          colorscale: "Earth"
        }
      }
    ];

    let bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      //hovermode: "closest",
      xaxis: { title: "OTU ID" },
      yaxis: {'title': "Number of Bacteria"},
    };

    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleInfo, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otuIds.map(otuID => `OTU ${otuID} `);

    // Build a Bar Chart
    // Make sure to slice and reverse the input data appropriately
    let barInfo = [
      {
        y: yticks.slice(0, 10).reverse(),
        x: sampleValues.slice(0, 10).reverse(),
        text: otuLabels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];

    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {'title': "Number of Bacteria"}
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", barInfo, barLayout);
  });
}


// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i < names.length; i++){
      dropdown
        .append("option")
        .text(names[i])
        .property("value", names[i]);
    };

    // Get the first sample from the list
    let firstSample = names[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
