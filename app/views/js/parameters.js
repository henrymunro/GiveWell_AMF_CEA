import {median, mean} from './reducers/reducerUtilities'


// Parameter Hiracy
const params = [
{
	"heading": "Parameters - Shared",
	"params": [
		{
			"paramID": 1,
			"paramName":"Discount rate",
			"unit":"%",
			"hint":"The discount rate adjusts for benefits that occur at different points in time. For a number of reasons, individuals may believe it is preferable for a good thing to happen today than for that same good thing to happen at some point in the future.",
			"subjective":"1"
	
		}
	]
},

{
	"heading": "Parameters - Against Malaria Foundation",
	"params": [
		{
			"paramID": 2,
			"paramName":"Value of development benefits from a year of ITN coverage relative to a year of deworming in Baird",
			"unit":"%",
			"hint":`It is possible that avoiding intestinal parasites and avoiding malaria parasites both benefit children through similar mechanisms. The development benefits included in this parameter will apply to individuals younger than 15—not just children under 5.

					This input is highly uncertain.

					Note that the value of a year of deworming in Baird is calculated based on your inputs in the 'Deworming - General' section. Charity-specific adjustments and the alternate funders adjustment for deworming are excluded.`,
			"subjective":"1"
		},
		{	
			"paramID": 3,
			"paramName":"Relative efficacy of ITNs for reducing mortality of individuals age 5 and older",
			"unit":"%",
			"hint":`The link between ITN coverage and age 5 and over mortality is not well established from empirical research. We have spoken with several malaria experts who agreed that there is a solid theoretical basis for believing that ITNs should avert adult deaths. However, these experts were resistant to precisely estimating ITNs' protective efficacy for adults.

					In our model, we consider the ratio of adult deaths to child deaths in countries where AMF works according to estimates from the Global Burden of Disease Project. 

					An input of 100% indicates that ITNs avert deaths directly in accordance with this ratio.

					For example: Imagine that data suggest there are two under-5 malaria deaths for every age 5+ malaria death in a given setting. An input of 100% for this parameter would suggest that for every two under-5 deaths averted, one age 5+ death is averted. Similarly, in the same situation an input of 50% would indicate that one age 5+ death is averted for every four under-5 deaths averted.  

					Note that one might choose a low value for this parameter if he or she believes that Global Burden of Disease estimates overstate malaria mortality in individuals age 5 and older.`,
			"subjective":"1"
		},
		{
			"paramID": 4,
			"paramName":"Net use adjustment",
			"unit":"%",
			"hint":`This adjustment is used to account for reduced efficacy due to poor net usage (i.e. people who receive nets not sleeping under them). 

					Adherence to net use was imperfect in trial contexts, but we have reason to believe that net use following AMF's distributions may be even lower.  

					A document linked to on the right provides information about net use in bed net trials and AMF programs. Methods for collecting usage data vary, and we don't believe we can make a simple apples-to-apples comparison between AMF use data and use data from bed net trials.

					An excerpt from Lengeler 2004 (pgs. 10-11) details why net use may be a concern in large-scale distributions:

					'The bulk of data in this review describe impact under ideal trial conditions (efficacy) rather than impact under large-scale programme conditions (effectiveness). While the difference between efficacy and effectiveness is likely to be small for certain medical interventions (such as vaccination or surgery), it can potentially be large for preventive interventions such as ITNs. 
					 
					Some of the consequences of moving from a scientific trial towards a large-scale programme is illustrated by the results of the two mortality trials carried out in The Gambia. The first trial was carried out under well-controlled implementation conditions, with a high coverage rate in the target population (Gambia (Alonso)). Unfortunately it was not randomized and hence not included in the present analysis. The second one was the evaluation of a national impregnation programme carried out by primary health care personnel and which faced some operational problems...and a lower coverage rate (around 60%) of the target population (Gambia (D’Alessandro)).The difference of impact between the two studies is important: the first trial achieved a total reduction in mortality of 42%, while the protective efficacy in the second trial was 23%.' `,
			"subjective":"1"
		},
		{
			"paramID": 5,
			"paramName":"Proportion of mortality attributed to malaria in areas AMF works vs. the contexts of trials in Lengeler 2004",
			"unit":"%",
			"hint":`Our estimate of how effectively ITNs avert deaths is based on the summary effect from Lengeler 2004, a meta-analysis of universal bed net or curtain distribution trials. We adjust the effect found in that meta-analysis based on differences in all-cause mortality rates in the contexts of the trials versus the contexts AMF works in today.

					That adjustment should be sufficient if, absent nets, the portion of all-cause mortality coming from malaria mortality is constant across settings.

					Use this parameter to make an adjustment to account for the possibility that the portion of all-cause mortality that is due to malaria is lower in areas where AMF works than it was in trial settings.

					We are uncertain about the appropriate value for this parameter and have limited confidence in our suggested input values.

					The sensitivity checks at the bottom of the 'Bed nets' tab may be a helpful reference when considering the value to use for this parameter.`,
			"subjective":"0"
		},
		{
			"paramID": 6,
			"paramName":"Replicability adjustment - ITNs",
			"unit":"%",
			"hint":"This adjustment is used to account for the possibility that the summary effect reported in Lengeler's 2004 meta-analysis might not have been the true effect ITNs had on the populations being studied.This input may also capture external validity concerns not accounted for elsewhere in the model.",
			"subjective":"0"
		},
		{
			"paramID": 7,
			"paramName":"ITN alternative funders adjustment",
			"unit":"%",
			"hint":"In some of the cases where AMF does not make a bednet distribution, a different funder takes AMF's place so that the distribution still moves forward with some delay. This input accounts for how much we should discount the value of an AMF distribution given that a different funder may take AMF's place in its absence.",
			"subjective":"0"
		}
	]
},
{
	"heading": "Personal Values - Consumption Increases",
	"params": [
		{
			"paramID": 8,
			"paramName":"Value assigned to doubling consumption for one person for one year",
			"unit":"",
			"hint":`Our model accounts for changes in the natural log of consumption. The logarithmic model captures the idea that money has diminishing value as you get more and more of it. 

					For example, our model considers a 50% increase in income as a little better than 50% as good as an 100% increase in income.`,
			"subjective":"1"
		}
	]
},
{
	"heading": "Personal Values - AMF",
	"params": [
		{
			"paramID": 9,
			"paramName":"Value assigned to averting the death of an individual under 5 — AMF",
			"unit":"",
			"hint":`This input captures the value you place on preserving the life of a very young child. 

					We don't have great information about the typical age of death from malaria. The distribution of malaria mortality by age likely varies depending on transmission intensity and the degree of seasonality in transmission. 

					Carneiro et al. 2010 provides analysis of malaria deaths by age based on data from sub-Saharan Africa. Their work suggests that the peak rate of malaria mortality occurs before 12 months of age in most settings, but a significant number of deaths occur at later ages (see linked chart in sources column to the right).

					We are uncertain whether deaths averted by ITNs are likely to follow an age distribution that closely resembles the distribution of ages of malaria deaths.   `,
			"subjective":"1"
		},
		{
			"paramID": 10,
			"paramName":"Value assigned to averting the death of an individual 5 or older — AMF",
			"unit":"",
			"hint":"",
			"subjective":"1"
		}
	]
},



{
	"heading": "Parameter - Deworming - General",
	"params": [
		{
			"paramID": 11,
			"paramName":"Treatment effect of deworming on ln(consumption)",
			"unit":"",
			"hint":`This input is used to select between the different effect sizes found by Baird.`,
			"subjective":"1"
		},
		{
			"paramID": 12,
			"paramName":"Average number of years between deworming and the beginning of long term benefits",
			"unit":"",
			"hint":`Individuals are dewormed in childhood, but the long term benefits on consumption do not start until an individual beings working. `,
			"subjective":"0"
		},
		{
			"paramID": 13,
			"paramName":"Duration of long term benefits of deworming (in years)",
			"unit":"years",
			"hint":`Once deworming-related consumption benefits begin, how many years do you expect them to last for?`,
			"subjective":"0"
		},
		{
			"paramID": 14,
			"paramName":"Multiplier for resource sharing within households",
			"unit":"",
			"hint":`If a person treated for worms earns more money and supports a family, then multiple people may benefit—not just the person who was dewormed. 

					In a multi-person household with one wage earner, a 10% increase in wages could enable every member of the household to consume 10% more. However, many households will have multiple wage earners, and household size may change overtime.`,
			"subjective":"1"
		},
		{
			"paramID": 15,
			"paramName":"Adjustment for El Niño",
			"unit":"%",
			"hint":`The consumption increase found by Baird et al. may not accurately represent the true impact deworming had on the population being studied. This input is used to account for that possibility and any external validity concerns not captured in the other inputs. A 90% value for this parameter implies a 10% penalty for replicability concerns.`,
			"subjective":"0"
		},
		{
			"paramID": 16,
			"paramName":"Adjustment for years of treatment in Baird et al. vs. years of treatment in charities' programs",
			"unit":"%",
			"hint":`If a person treated for worms earns more money and supports a family, then multiple people may benefit—not just the person who was dewormed. 

					In a multi-person household with one wage earner, a 10% increase in wages could enable every member of the household to consume 10% more. However, many households will have multiple wage earners, and household size may change overtime.`,
			"subjective":"1"
		},
		{
			"paramID": 17,
			"paramName":"Proportion of dewormed children that benefited from long-term gains in Baird et al.",
			"unit":"%",
			"hint":`The baseline prevalence (in 1998) for the first group to receive deworming treatment was significantly lower than the baseline prevalence (in 1999) for the second group to receive deworming treatment, likely due to flooding from an unusually strong El Niño event. `,
			"subjective":"0"
		},
		{
			"paramID": 18,
			"paramName":"Replicability adjustment for deworming",
			"unit":"%",
			"hint":`Baird et al. found benefits to future income from 2.41 additional years of deworming assigned to their study's treatment group. 

					Our charities aim to deworm children for up to 10 years. There may be diminishing returns as the total years of treatment increase.

					Additionally, children in our charities' programs may be younger on average than children dewormed in Baird's study. We are uncertain how this would affect the value of deworming programs. `,
			"subjective":"1"
		},
		{
			"paramID": 19,
			"paramName":"Additional years of treatment assigned to Baird's treatment group",
			"unit":"years",
			"hint":`The treatment group in Baird's study was assigned an average of 2.41 more years of deworming than the control group.

					Since Baird's work was based on an intention to treat design, one could argue that "additional years of treatment assigned" is larger than the additional years of treatment actually received. Individuals may want to use a lower input value to account for this.`,
			"subjective":"0"
		},
	]
},
]


// Researcher values where key = paramID
const researcherValues = [
{
	"name": "Andrew",
	"1":'3.0',
	"2":'20',
	"3":'40',
	"4":'80',
	"5":'83',
	"6":'95',
	"7":'78',
	"8":'0.27',
	"9":'8',
	"10":'32',
	"11":'0.139',
	"12":'8',
	"13":'25',
	"14":'2.0',
	"15":'71',
	"16":'50',
	"17":'100',
	"18":'15',
	"19":'2.41',
	"20":'',

},
{
	"name": "Chelsea",
	"1":'2.0',
	"2":'50',
	"3":'50',
	"4":'85',
	"5":'83',
	"6":'95',
	"7":'78',
	"8":'1.00',
	"9":'35',
	"10":'70',
	"11":'0.139',
	"12":'5',
	"13":'40',
	"14":'2.2',
	"15":'71',
	"16":'70',
	"17":'100',
	"18":'10',
	"19":'2.41',
	"20":'',

},
{
	"name": "Chris",
	"1":'3.0',
	"2":'3',
	"3":'60',
	"4":'80',
	"5":'83',
	"6":'80',
	"7":'60',
	"8":'0.25',
	"9":'15',
	"10":'30',
	"11":'0.139',
	"12":'8',
	"13":'45',
	"14":'2.0',
	"15":'71',
	"16":'75',
	"17":'100',
	"18":'10',
	"19":'2.41',
	"20":'',

},
{
	"name": "Elie",
	"1":'3.0',
	"2":'20',
	"3":'50',
	"4":'80',
	"5":'85',
	"6":'95',
	"7":'78',
	"8":'0.23',
	"9":'15',
	"10":'60',
	"11":'0.140',
	"12":'8',
	"13":'40',
	"14":'2.0',
	"15":'71',
	"16":'50',
	"17":'100',
	"18":'20',
	"19":'2.41',
	"20":'',

},
{
	"name": "Holden",
	"1":'3.0',
	"2":'50',
	"3":'25',
	"4":'80',
	"5":'83',
	"6":'85',
	"7":'78',
	"8":'0.17',
	"9":'3',
	"10":'30',
	"11":'0.140',
	"12":'5',
	"13":'20',
	"14":'2.0',
	"15":'54',
	"16":'50',
	"17":'100',
	"18":'50',
	"19":'2.41',
	"20":'',

},
{
	"name": "Isabel",
	"1":'2.0',
	"2":'10',
	"3":'50',
	"4":'80',
	"5":'83',
	"6":'100',
	"7":'78',
	"8":'0.35',
	"9":'12',
	"10":'36',
	"11":'0.139',
	"12":'5',
	"13":'30',
	"14":'2.2',
	"15":'71',
	"16":'65',
	"17":'100',
	"18":'20',
	"19":'2.41',
	"20":'',

},
{
	"name": "James",
	"1":'5.0',
	"2":'10',
	"3":'80',
	"4":'80',
	"5":'83',
	"6":'95',
	"7":'78',
	"8":'0.22',
	"9":'31',
	"10":'38',
	"11":'0.139',
	"12":'7',
	"13":'30',
	"14":'2.0',
	"15":'71',
	"16":'55',
	"17":'80',
	"18":'20',
	"19":'2.41',
	"20":'',

},
{
	"name": "Josh",
	"1":'3.0',
	"2":'7',
	"3":'50',
	"4":'80',
	"5":'85',
	"6":'95',
	"7":'78',
	"8":'0.30',
	"9":'10',
	"10":'35',
	"11":'0.140',
	"12":'8',
	"13":'30',
	"14":'2.2',
	"15":'71',
	"16":'50',
	"17":'100',
	"18":'12',
	"19":'2.41',
	"20":'',

},
{
	"name": "Natalie",
	"1":'3.0',
	"2":'20',
	"3":'60',
	"4":'90',
	"5":'83',
	"6":'95',
	"7":'78',
	"8":'1.00',
	"9":'50',
	"10":'121',
	"11":'0.139',
	"12":'8',
	"13":'40',
	"14":'2.2',
	"15":'71',
	"16":'50',
	"17":'75',
	"18":'17',
	"19":'2.41',
	"20":'',

},
{
	"name": "Sophie",
	"1":'5.0',
	"2":'5',
	"3":'5',
	"4":'80',
	"5":'83',
	"6":'90',
	"7":'78',
	"8":'0.02',
	"9":'0.1',
	"10":'1',
	"11":'0.140',
	"12":'5',
	"13":'30',
	"14":'2.2',
	"15":'71',
	"16":'41',
	"17":'100',
	"18":'4',
	"19":'2.41',
	"20":'',

},
]

// Weaves the researcher values into the overall parameters object
const combinedValues = params.map(section => {
	const updatedParams = section.params.map(param => {
		const filteredResearcherValues = researcherValues.map(researcherValue => {
			return {
				"name": researcherValue.name,
				"value": researcherValue[param.paramID]
			}
		})
		const strippedResearcherValues = filteredResearcherValues.map(elm => Number(elm.value))
		const meanResearcherValues = mean(strippedResearcherValues)
		const medianResearcherValues = median(strippedResearcherValues)

		return Object.assign({}, param, {researcherValues: filteredResearcherValues, meanResearcherValues, medianResearcherValues, value: medianResearcherValues})
	})
	return Object.assign({}, section, {params: updatedParams})
})



export default combinedValues

const distinctResearchers = researcherValues.map(elm => elm.name)

export { distinctResearchers }
