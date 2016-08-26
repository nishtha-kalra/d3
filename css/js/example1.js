var data = [
		{date: "12/27/2012", http_404: 2, http_200: 190, http_302: 100},
		{date: "12/28/2012", http_404: 2, http_200: 10, http_302: 100},
		{date: "12/29/2012", http_404: 1, http_200: 300, http_302: 200},
		{date: "12/30/2012", http_404: 2, http_200: 90, http_302: 0},
		{date: "12/31/2012", http_404: 2, http_200: 90, http_302: 0},
		{date: "01/01/2013", http_404: 2, http_200: 90, http_302: 0},
		{date: "01/02/2013", http_404: 1, http_200: 10, http_302: 1},
		{date: "01/03/2013", http_404: 2, http_200: 90, http_302: 0},
		{date: "01/04/2013", http_404: 2, http_200: 90, http_302: 0},
		{date: "01/05/2013", http_404: 2, http_200: 90, http_302: 0},
		{date: "01/06/2013", http_404: 2, http_200: 200, http_302: 1},
		{date: "01/07/2013", http_404: 1, http_200: 200, http_302: 100}
	];

var ndx = crossfilter(data);
var parseDate = d3.time.format("%m/%d/%Y").parse;
data.forEach(function(d) {
	d.date  = parseDate(d.date);
	d.total = d.http_404+d.http_200+d.http_302;
	d.Year  = d.date.getFullYear();
});

var dateDim = ndx.dimension(function(d) {return d.date;});
var hits = dateDim.group().reduceSum(function(d) {return d.total;});
var minDate = dateDim.bottom(1)[0].date;
var maxDate = dateDim.top(1)[0].date;
var hitslineChart  = dc.lineChart("#chart-line-hitsperday");

hitslineChart
	.width(700).height(300)
	.dimension(dateDim)
	.group(hits)
	.x(d3.time.scale().domain([minDate,maxDate]))
	.yAxisLabel("Hits per day");

var chartringyear = dc.pieChart("#chart-ring-year");
var yearDim  = ndx.dimension(function(d) {return +d.Year;});
var year_total = yearDim.group().reduceSum(function(d) {return d.total;});

chartringyear
    .width(150).height(150)
    .dimension(yearDim)
    .group(year_total)
    .innerRadius(30);

dc.renderAll();

