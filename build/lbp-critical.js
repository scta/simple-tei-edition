$(document).ready(function () {
  $("tei-cit").append("<span'>*</span>")
  $("tei-app").append("<span'>*</span>")

  $(document).on("mouseenter", "tei-app", function () {
    $(this).css({"background-color": "yellow"});
    var rdg = $(this).children("tei-rdg");
    var lem = $(this).children("tei-lem").first().text();
    var n = $(this).children("tei-lem").first().attr("n");
    $(".info").html("");
    $(rdg).each(function () {
      var siglum = $(this).attr("wit")
      siglum = siglum.replace("#", "");

      var type = $(this).attr("type") ? $(this).attr("type") : "";
      var text = $(this).text() ? $(this).text() : "";
      if (type === "variation-absent") {
        $(".info").append("<p>" + lem + " <em>om.</em> " + siglum + "</p>");
      }
      else if (type === "variation-present") {
        $(".info").append("<p>" + n + " <em>in textu</em> " + siglum + "</p>");
      }
      else if (type === "correction-addition") {
        $(".info").append("<p>" + lem + "] " + text + " <em>add.</em> " + siglum + "</p>");
      }
      else if (type === "correction-deletion") {
        $(".info").append("<p>" + n + "] " + text + " <em>del.</em> " + siglum + "</p>");
      }
      else if (type === "correction-substitution") {
        var del = $(this).find("tei-del").first().text();
        var add = $(this).find("tei-add").first().text();
        $(".info").append("<p>" + lem + "] " + add + " <em>corr. ex</em> " + del + " " + siglum + "</p>");
      }
      else {
        $(".info").append("<p>" + lem + "] " + text + " " + siglum + " <em>" + type + "</em></p>");
      }
    });
  });
  $(document).on("mouseleave", "tei-app", function () {
    $(this).css({"background-color": "inherit"});
    $(this).children(".rdg-info").remove();
  });
  //add popup for quote citations
  $(document).on("mouseenter", "tei-cit", function () {
    $(this).css({"background-color": "yellow"});
    var biblOrNote = $(this).children("tei-bibl, tei-note");
    $(".info").html("");
    $(biblOrNote).each(function () {
      var text = $(this).text() ? $(this).text() : "";
      $(".info").append("<p>" + text + "</p>");
    });
  });
  $(document).on("mouseleave", "tei-cit", function () {
    $(this).css({"background-color": "inherit"});
    $(this).children(".bibl-info").remove();
  });
});
