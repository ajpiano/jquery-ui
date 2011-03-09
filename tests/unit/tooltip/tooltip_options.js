/*
 * tooltip_options.js
 */
(function($) {

module("tooltip: options", (function(off) {

      return {
              setup: function() {
                      $.fx.off = true;
              },
              teardown: function() {
                      $(":ui-tooltip").tooltip("destroy");
                      $.fx.off = off;
              }
      };

})($.fx.off));


test("option: items", function() {
	var event = $.Event("mouseenter");
	event.target = $("[data-tooltip]");
	$("#qunit-fixture").tooltip({
		items: "[data-tooltip]",
		content: function() {
			return $(this).attr("data-tooltip");
		}
	}).tooltip("open", event);
	same( $(".ui-tooltip").text(), "text" );
});

test("content: default", function() {
	$("#tooltipped1").tooltip().tooltip("open");
	same( $(".ui-tooltip").text(), "anchortitle" );
});

test("content: return string", function() {
	$("#tooltipped1").tooltip({
		content: function() {
			return "customstring";
		}
	}).tooltip("open");
	same( $(".ui-tooltip").text(), "customstring" );
});

test("content: return jQuery", function() {
	$("#tooltipped1").tooltip({
		content: function() {
			return $("<div></div>").html("cu<b>s</b>tomstring");
		}
	}).tooltip("open");
	same( $(".ui-tooltip").text(), "customstring" );
});

test("content: callback string", function() {
	stop();
	$("#tooltipped1").tooltip({
		content: function(response) {
			response("customstring2");
			setTimeout(function() {
				same( $(".ui-tooltip").text(), "customstring2" );
				start();
			}, 100)
		}
	}).tooltip("open");

});

test("option: disabled true on init", function() {

    var tooltip = $("#tooltipped1"),
        widget = tooltip.tooltip({
          disabled: true
        }).simulate("mouseover", { target: tooltip[0] }).tooltip("widget");

    ok(widget.is(":hidden"));

});

test("option: disabled false on init", function() {

    var tooltip = $("#tooltipped1"),
        widget = tooltip.tooltip({
          disabled: true
        }).simulate("mouseover", { target: tooltip[0] }).tooltip("widget");

    ok(widget.is(":hidden"));

});

test("option: disabled set to false using disabled option", function() {

    expect(5);

    var div = $( "#tooltipped1" ),
        widget = div.tooltip().tooltip("widget");

    ok( widget.is(":hidden") );

    div.simulate( "mouseover", { target: div[0] });
    ok( widget.is(":visible") );

    div.simulate( "mouseout", { target: div[0] });
    ok( widget.is(":hidden") );

    div.tooltip("option","disabled",true);
    div.simulate( "mouseover", { target: div[0] });
    ok( widget.is(":hidden") );

    div.simulate( "mouseout", { target: div[0] });
    ok( widget.is(":hidden") );

});
test("option: disabled true on init, set to false using disabled option", function() {

    expect(5);

    var div = $( "#tooltipped1" ),
        widget = div.tooltip({disabled:true}).tooltip("widget");

    ok( widget.is(":hidden") );

    div.simulate( "mouseover", { target: div[0] });
    ok( widget.is(":hidden") );

    div.simulate( "mouseout", { target: div[0] });
    ok( widget.is(":hidden") );

    div.tooltip("option","disabled",false);
    div.simulate( "mouseover", { target: div[0] });
    ok( widget.is(":visible") );

    div.simulate( "mouseout", { target: div[0] });
    ok( widget.is(":hidden") );

});

})(jQuery);
