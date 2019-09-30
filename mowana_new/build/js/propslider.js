
$(function(){
    $( "#price-range" ).slider({
      range: true,
      min: 500000,
      max: 5000000,
      values: [ 1200000, 2505000 ],
      slide: function( event, ui ) {
        $( "#inputMinPrice" ).val( "R" + ui.values[ 0 ] + " - R" + ui.values[ 1 ] );
      }
    });
    $( "#inputMinPrice" ).val( "R" + $( "#price-range" ).slider( "values", 0 ) +
      " - R" + $( "#price-range" ).slider( "values", 1 ) );

      $( "#size-range" ).slider({
      range: true,
      min: 50,
      max: 500,
      values: [ 100, 250 ],
      slide: function( event, ui ) {
        $( "#inputMinSize" ).val( ui.values[ 0 ] + "m2" + " - " + ui.values[ 1 ] + "m2"  );
      }
    });
    $( "#inputMinSize" ).val( $( "#size-range" ).slider( "values", 0 ) + "m2" + " - " + 
      $( "#size-range" ).slider( "values", 1 ) + "m2");	

     $( "#price-rangesale" ).slider({
      range: true,
      min: 500000,
      max: 5000000,
      values: [ 1200000, 2505000 ],
      slide: function( event, ui ) {
        $( "#inputMinPriceSale" ).val( "R" + ui.values[ 0 ] + " - R" + ui.values[ 1 ] );
      }
    });
    $( "#inputMinPriceSale" ).val( "R" + $( "#price-rangesale" ).slider( "values", 0 ) +
      " - R" + $( "#price-rangesale" ).slider( "values", 1 ) );

      $( "#size-rangesale" ).slider({
      range: true,
      min: 50,
      max: 500,
      values: [ 100, 250 ],
      slide: function( event, ui ) {
        $( "#inputMinSizeSale" ).val( ui.values[ 0 ] + "m2" + " - " + ui.values[ 1 ] + "m2"  );
      }
    });
    $( "#inputMinSizeSale" ).val( $( "#size-rangesale" ).slider( "values", 0 ) + "m2" + " - " + 
      $( "#size-rangesale" ).slider( "values", 1 ) + "m2");	
 } );
