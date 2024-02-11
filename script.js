require([
  "esri/Map",
  "esri/layers/FeatureLayer",
  "esri/views/MapView",
  "dojo/domReady!"
], function (Map, FeatureLayer, MapView) {
  // Create the map
  var map = new Map({
    basemap: "gray"
  });

  // Create the MapView
  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-90.24208557860894, 38.62207499758306],
    zoom: 11
  });

  /*************************************************************
   * The PopupTemplate content is the text that appears inside the
   * popup. {fieldName} can be used to reference the value of an
   * attribute of the selected feature. HTML elements can be used
   * to provide structure and styles within the content. The
   * fieldInfos property is an array of objects (each object representing
   * a field) that is use to format number fields and customize field
   * aliases in the popup and legend.
   **************************************************************/

  var template = {
    // autocasts as new PopupTemplate()
    title: "Neighborhood: {NHD_NAME}",
    content: [
      {
        // It is also possible to set the fieldInfos outside of the content
        // directly in the popupTemplate. If no fieldInfos is specifically set
        // in the content, it defaults to whatever may be set within the popupTemplate.
        type: "fields",
        fieldInfos: [
          {
            fieldName: "NHD_NUM",
            label: "NHD_NUM: ",
            visible: true
          },
          {
            fieldName: "NHD_NAME",
            label: "NHD_NAME: ",
            visible: true
          },
          {
            fieldName: "ANGLE",
            label: "ANGLE: ",
            visible: true
          },
          {
            fieldName: "NHD_NUMTXT",
            label: "NHD_NUMTXT: ",
            visible: true
          },
          {
            fieldName: "NHD_NUM_ST",
            label: "NHD_NUM_ST: ",
            visible: true,
          },
          {
            fieldName: "Shape__Area",
            label: "Shape__Area: ",
            visible: true,
            format: {
              digitSeparator: true,
              places: 0
            }
          }
        ]
      }
    ]
  };

  var renderer = {
    type: "simple",
    symbol: {
      type: "simple-fill",
      size: 6,
      color: [0, 0, 0, 0],
      outline: {
        width: 0.5,
        color: [50, 50, 50, 0.7]
      }
    }
  };

  // Reference the popupTemplate instance in the
  // popupTemplate property of FeatureLayer
  var featureLayer = new FeatureLayer({
    url:
      "https://services2.arcgis.com/bB9Y1bGKerz1PTl5/ArcGIS/rest/services/STL_Neighborhood/FeatureServer/0",
    outFields: ["*"],
    popupTemplate: template,
    renderer: renderer
  });

  map.add(featureLayer);
});
