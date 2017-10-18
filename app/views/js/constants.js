
// Pre defined values that can't be updated by the user

const constants = [
{
	"heading": "Nets Sheet - Mortality reduction from net distributions",
	"params": [
		{
			"paramName":"Deaths averted per protected child under 5 (summary effect from Lengeler 2004 meta-analysis)",
			"unit":"",
			"hint":`"The summary rate difference, which expresses how many lives can be saved for every 1000 children protected, was 5.53 deaths averted per 1000 children protected per year (95% CI 3.39 to 7.67; Analysis 1.2). I performed a regression analysis of the natural logarithm of the rate difference on the entomological inoculation rate and could not find a trend (r 2 = 0.52, F = 3.2 on 1,3 degrees of freedom, P = 0.2). In contrast to protective efficacies, the risk differences seemed to have a tendency towards a higher effect with a higher entomological inoculation rate. This apparent paradox is because the baseline mortality rates are higher in areas with high entomological inoculation rates." Lengeler 2004, Pg 8. Author has confirmed that "protection" means "has received an ITN", not "has been confirmed to be using an ITN."`,
			"value": 0.00553
		},
		{
			"paramName":"Mortality in AMF contexts relative to study contexts",
			"unit":"",
			"hint":``,
			"value": 44
		},
		{
			"paramName":"Portion of mortality difference attributed to ITNs",
			"unit":"%",
			"hint":`Funding for malaria prevention began to rapidly increase after 2004, thus some of the mortality decline after 2004 was probably due to bednets. (see http://files.givewell.org/files/DWDA%202009/Interventions/Nets/2012%20vet/Malaria%20case%20rate%20and%20death%20rate%20information%20edited.xls from http://blog.givewell.org/2012/10/18/revisiting-the-case-for-insecticide-treated-nets-itns/)

					We have limited confidence in the default figure, but we believe 25% is a reasonable estimate. See Eisele et al. 2012 (https://malariajournal.biomedcentral.com/articles/10.1186/1475-2875-11-93) for more information about the role ITNs have played in mortality declines.`,
			"value": 25
		},
		{
			"paramName":"Deaths averted per child protected after adjusting for lower mortality in today's settings",
			"unit":"",
			"hint":``,
			"value": 0.00321
		},
		{
			"paramName":"Efficacy reduction due to insecticide resistance",
			"unit":"%",
			"hint":`When we last updated our webpage on insecticide resistance (http://www.givewell.org/international/technical/programs/insecticide-treated-nets/insecticide-resistance-malaria-control) in June 2016, we stated that we expected a one-third decrease in ITN efficacy as a result of insecticide resistance (IR). The one-third reduction in efficacy was largely based on Churcher et al. 2016 (https://elifesciences.org/articles/16090) which was unpublished in June of 2016. Since that time, AMF has begun to plan and carry out distributions in areas it didn't previously work. AMF's work in Uganda sometimes involves distribution of nets treated with peronyl butoxide (PBO). We expect that IR will be less of a threat to the efficacy of PBO nets. We've arbitrarily lowered our standard 33% adjustment by about one-third in Uganda. AMF also intends to distribute nets in Papua New Guinea where we don't expect IR to be a problem. We make no adjustment for IR in Papua New Guinea. The calculation that leads to our final IR adjustment figure can be seen at https://docs.google.com/spreadsheets/d/1meC5lEwRceSuOT9Ag9ZH_gw08nm8pMPaBNT4gCD5_Mw/edit#gid=0.`,
			"value": 26
		}
	]
},

{
	"heading": "Nets Sheet - Assessing marginal impact",
	"params": [
		{
			"paramName":"Percent of all individuals owning nets (in absence of a distribution)",
			"unit":"%",
			"hint":`In many AMF distributions, the number of nets distributed to each household is based on the number of people in the household and the allocation does not take into account whether there are any non-worn-out nets already in the household. Our model assumes that some portion of people receive a new net when they had a non-worn-out net available. The value here is a guess and is based on the average lifespan of nets, the interval between campaigns (generally 3 or more years), and AMF data from Malawi where data on existing nets was collected.`,
			"value": 20
		},
		{
			"paramName":"Proportion of 'extra' nets distributed that are eventually used",
			"unit":"%",
			"hint":`When a net is distributed to an individual who already has a usable net, the new net may eventually be used. 

					This input accounts for the average proportion of the lifespan of a LLIN that extra nets are eventually used for.

					This true value of this input is highly uncertain.`,
			"value": 50
		}
	]
},

{
	"heading": "Nets Sheet - Cost per year of protection",
	"params": [
		{
			"paramName":"Arbitrary donation size",
			"unit":"$",
			"hint":`The value in this row is used for illustrative purposes only—changing this value will not affect the final cost-effectiveness estimates.`,
			"value": 1000000
		},
		{
			"paramName":"Pre-distribution wastage",
			"unit":"%",
			"hint":`Some procured nets may never make it to distribution. We have limited confidence in the default value for this input.`,
			"value": 5
		},
		{
			"paramName":"Cost per ITN",
			"unit":"$",
			"hint":``,
			"value": 4.85
		},
		{
			"paramName":"Number of ITNs distributed per person in the community",
			"unit":"",
			"hint":`"At the household level, the distribution of 1 LLIN for every 2 members of the household will entail rounding up in households with an odd number of members (e.g. 3 LLINs for a household with 5 members, etc.) Because of this rounding up, the achievement of 1 LLIN for every 2 people at household level requires an overall ratio, for procurement purposes, of 1 LLIN for every 1.8 people in the target population."
						See http://www.givewell.org/international/technical/programs/insecticide-treated-nets#footnote8_zqhtlcm`,
			"value": 0.56
		},
		{
			"paramName":"Number of people covered",
			"unit":"",
			"hint":`Remaining dollars available for purchasing ITNs / Cost per person covered in a universal distribution`,
			"value": 352367
		},
		{
			"paramName":"Percent of population under 5 years old (used for mortality effects and development effects)",
			"unit":"%",
			"hint":``,
			"value": 17
		},
		{
			"paramName":"Percent of population ages 5-14 (used for development effects only)",
			"unit":"%",
			"hint":``,
			"value": 30
		},
		{
			"paramName":"Lifespan of an ITN",
			"unit":"years",
			"hint":`The default value of 2.22 is drawn from the decay model discussed at http://www.givewell.org/international/technical/programs/insecticide-treated-nets#Decay`,
			"value":2.22
		},
		{
			"paramName":"Person-years of coverage for under 5's",
			"unit":"years",
			"hint":``,
			"value": 136152
		},
		{
			"paramName":"Person-years of coverage for ages 5-14",
			"unit":"years",
			"hint":``,
			"value": 238048
		},
		{
			"paramName":"Cost per person year of protection for under 15's",
			"unit":"$",
			"hint":``,
			"value": 2.67
		},
	]
},

{
	"heading": "Nets Sheet - Deaths averted — individuals 5+ years old",
	"params": [
		{
			"paramName":"Ratio of 5 and over malaria deaths to under-5 malaria deaths",
			"unit":"",
			"hint":``,
			"value": 0.49
		},
	]
},


]



		// {
		// 	"paramName":"",
		// 	"unit":"",
		// 	"hint":``,
		// 	"value":
		// }
export default constants