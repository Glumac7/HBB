window.addEventListener("scroll", function()
{
	if(document.body.offsetWidth >= 991)
	{
		var scrollTop = window.pageYOffset || document.body.scrollTop;
		var nav = document.querySelector('.navbar');
		var links = document.getElementById('nav-ul').children;

		if(scrollTop)
		{
            nav.style.backgroundColor = "rgba(255, 255, 255, .95)";
            nav.style.borderBottom = "3px solid #6922B0";
		    
		    for (let i = 0; i < links.length; i++) 
		    {
		    	var a_tags;
		        a_tags = links[i].children;
		        a_tags[0].style.color = "#606060";
		    }
		}
		else
		{
            nav.style.backgroundColor = "rgba(0,0,0,0)";
            nav.style.borderBottom = "0";
			
		    for (let i = 0; i < links.length; i++) 
		    {
		    	var a_tags;
		        a_tags = links[i].children;
		        a_tags[0].style.color = "#6922B0";
		    }
		}
	}

}, false);