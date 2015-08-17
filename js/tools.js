
// API base URL
var base = "http://shapefile.io/v1/";

// A simple wrapper around a jQuery ajax upload API call
var upload = function(formData, callback) {
    $.ajax({
        url: base + "upload",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: "POST",
        success: callback
    });
};

$('#viewer-form').submit(function() {
    // Create a FormData object from the form DOM
    var formData = new FormData(document.getElementById("viewer-form"));

    // After uploading, redirect to the shapefile's `share` endpoint
    upload(formData, function(data) {
        window.location.href = base + data.shapefile + "/share";
    });

    return false;
});

$('#converter-form').submit(function() {
    // Create a FormData object from the form DOM
    var formData = new FormData(document.getElementById("converter-form"));

    upload(formData, function(data) {
        var div = $("#converter-formats");

        // Set links to download API endpoints for each format
        $('a.shp', div).attr('href', base + data.shapefile + '/download.shp');
        $('a.kml', div).attr('href', base + data.shapefile + '/download.kml');
        $('a.kmz', div).attr('href', base + data.shapefile + '/download.kmz');
        $('a.geojson', div).attr('href', base + data.shapefile + '/features.geojson');
        $('a.csv', div).attr('href', base + data.shapefile + '/records.csv');

        $('p.msg', div).text('Success! Choose a format to download ' + data.shapefile + ' as:');

        $('#converter-form').hide();
        div.show();
    });

    return false;
});
