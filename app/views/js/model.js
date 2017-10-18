export default ({modelData, modelConstants}) => {
	
	const pullBackValueFromModel = (modelData, name) => {
		let value 
		modelData.map(section => {
			section.params.map(param => {
				if(param.paramName === name) {
					value = param.value
				}
			})
		})

		return value
	}

	const calculateCostPerUnder5DeathAverted = () => {
		
		// Adjusted deaths averted per child under 5 targeted by a distribution =
		// Deaths averted per child protected after adjusting for lower mortality in today's settings
		// * Net use adjustment
		// * Replicability adjustment - ITNs
		// * Proportion of mortality attributed to malaria in areas AMF works vs. the contexts of trials in Lengeler 2004
		// * (1 - Efficacy reduction due to insecticide resistance)
		const adjustedDeathsAvertedPerChildUnder5TargetedByADistribution = pullBackValueFromModel(modelConstants, `Deaths averted per child protected after adjusting for lower mortality in today's settings`)	* pullBackValueFromModel(modelData, `Net use adjustment`)/100 * pullBackValueFromModel(modelData, `Replicability adjustment - ITNs`)/100 * pullBackValueFromModel(modelData, `Proportion of mortality attributed to malaria in areas AMF works vs. the contexts of trials in Lengeler 2004`)/100 * (1 - pullBackValueFromModel(modelConstants, `Efficacy reduction due to insecticide resistance`)/100)

		// Combined adjustment for pre-existing nets and alternative funders =
		// ( 1 - 
		// 		Percent of all individuals owning nets (in absence of a distribution)
		// 		* Proportion of "extra" nets distributed that are eventually used
		// ) * ITN alternative funders adjustment
		const combinedAdjustmentForPreExisitingNetsAndAlternativeFunders = (1 - (pullBackValueFromModel(modelConstants, `Percent of all individuals owning nets (in absence of a distribution)`)/100 * pullBackValueFromModel(modelConstants, `Proportion of 'extra' nets distributed that are eventually used`)/100)) * pullBackValueFromModel(modelData, `ITN alternative funders adjustment`)/100

		// Under-5 deaths averted = 
		// Person-years of coverage for under 5's 
		// * Combined adjustment for pre-existing nets and alternative funders 
		// * Adjusted deaths averted per child under 5 targeted by a distribution
		const under5DeathsAverted = pullBackValueFromModel(modelConstants, `Person-years of coverage for under 5's`) * combinedAdjustmentForPreExisitingNetsAndAlternativeFunders * adjustedDeathsAvertedPerChildUnder5TargetedByADistribution

		// Cost per under-5 death averted = 
		// Arbitrary donation size  
		// / Under-5 deaths averted
		const costPerUnder5DeathAverted = pullBackValueFromModel(modelConstants, `Arbitrary donation size`) / under5DeathsAverted

		return { 
			under5DeathsAverted,
			combinedAdjustmentForPreExisitingNetsAndAlternativeFunders,
			costPerUnder5DeathAverted: Math.floor(costPerUnder5DeathAverted)
		}

	
	}

	const calculateCostPerAge5PlusDeathAverted = (under5DeathsAverted) => {
		
		// Age 5+ deaths averted = 
		// Relative efficacy of ITNs for reducing mortality of individuals age 5 and older
		// * Ratio of 5 and over malaria deaths to under-5 malaria deaths
		// * Under-5 deaths averted
		const age5plusDeathsAverted = pullBackValueFromModel(modelData, `Relative efficacy of ITNs for reducing mortality of individuals age 5 and older`)/100 * pullBackValueFromModel(modelConstants, `Ratio of 5 and over malaria deaths to under-5 malaria deaths`) * under5DeathsAverted

		// Cost per age 5+ death averted = 
		// Arbitrary donation size
		// / Age 5+ deaths averted
		const costPerAge5PlusDeathAverted = pullBackValueFromModel(modelConstants, `Arbitrary donation size`) / age5plusDeathsAverted 

		return {
			costPerAge5PlusDeathAverted: Math.floor(costPerAge5PlusDeathAverted),
			age5plusDeathsAverted
		}

	}

	const calcuateUnitOfValueFromUnder5DeathsAvertedPerDollar = (costPerUnder5DeathAverted) => {
		
		// Units of value from under 5 deaths averted for each dollar donated = 
		// Value assigned to averting the death of an individual under 5 — AMF
		// / Cost per under-5 death averted
		const unitsOfValueFromUnder5DeathsAvertedPerDollar = pullBackValueFromModel(modelData, `Value assigned to averting the death of an individual under 5 — AMF`) / costPerUnder5DeathAverted
		return unitsOfValueFromUnder5DeathsAvertedPerDollar
	}

	const calcuateUnitOfValueFrom5AndOverDeathsAvertedPerDollar = (costPerAge5PlusDeathAverted) => {
		
		// Units of value from 5 and over deaths averted per dollar donated = 
		// Value assigned to averting the death of an individual 5 or older — AMF
		// / Cost per age 5+ death averted
		const unitOfValueFrom5AndOverDeathsAvertedPerDollar = pullBackValueFromModel(modelData, `Value assigned to averting the death of an individual 5 or older — AMF`) / costPerAge5PlusDeathAverted
		
		return unitOfValueFrom5AndOverDeathsAvertedPerDollar
	}


	const calculateUnitsOfValueFromDevelopmentalBenefitsPerDollar = (combinedAdjustmentForPreExisitingNetsAndAlternativeFunders) => {
		
		// Benefit on one year's income (discounted back because of delay between deworming and working for income) = 
		// Treatment effect of deworming on ln(consumption) 
		// / (1 + Discount rate ) ^ Average number of years between deworming and the beginning of long term benefits
		const benefitOnOneYearsIncome = pullBackValueFromModel(modelData, `Treatment effect of deworming on ln(consumption)`)/ Math.pow((1 + pullBackValueFromModel(modelData, `Discount rate`)/100), pullBackValueFromModel(modelData, `Average number of years between deworming and the beginning of long term benefits`))

		// Present value of lifetime benefits from a year of deworming (in terms of ln(income)) =
		// PV(rate, number of periods, payment amount)
		// PV(
		// 	Discount rate, 
		// 	Duration of long term benefits of deworming (in years), 
		// 	- Benefit on one year's income (discounted back because of delay between deworming and working for income)
		// )
		const presentValueOfLifeTimeBenefitsFromAYearOfDeworming = pv( pullBackValueFromModel(modelData, `Discount rate`)/100, pullBackValueFromModel(modelData, `Duration of long term benefits of deworming (in years)`), -1 * benefitOnOneYearsIncome)

		// Adjusted long term benefits per year of deworming in terms of ln(consumption) — before adjusting for alternative funders =
		// Present value of lifetime benefits from a year of deworming (in terms of ln(income))
		// * Multiplier for resource sharing within households
		// * Adjustment for El Niño
		// * Adjustment for years of treatment in Baird et al. vs. years of treatment in charities' programs
		// * Proportion of dewormed children that benefited from long-term gains in Baird et al.
		// * Replicability adjustment for deworming
		// / Additional years of treatment assigned to Baird's treatment group
		const adjustedLongTermBenefitsPerYearOfDeworming = presentValueOfLifeTimeBenefitsFromAYearOfDeworming *  pullBackValueFromModel(modelData, `Multiplier for resource sharing within households`) * pullBackValueFromModel(modelData, `Adjustment for El Niño`)/100 * pullBackValueFromModel(modelData, `Adjustment for years of treatment in Baird et al. vs. years of treatment in charities' programs`)/100 * pullBackValueFromModel(modelData, `Proportion of dewormed children that benefited from long-term gains in Baird et al.`)/100 * pullBackValueFromModel(modelData, `Replicability adjustment for deworming`)/100 / pullBackValueFromModel(modelData, `Additional years of treatment assigned to Baird's treatment group`)

		// Units of value from developmental benefits per dollar donated = 
		// (
		// 		Value of development benefits from a year of ITN coverage relative to a year of deworming in Baird
		// 		* Adjusted long term benefits per year of deworming in terms of ln(consumption) — before adjusting for alternative funders
		// 		* Value assigned to increasing ln(consumption) by one unit for one person for one year
		// 		* (1 - Efficacy reduction due to insecticide resistance)
		// 		* Combined adjustment for pre-existing nets and alternative funders 
		// ) / Cost per person year of protection for under 15's
		const unitsOfValueFromDevelopmentalBenefitsPerDollar = ( pullBackValueFromModel(modelData, `Value of development benefits from a year of ITN coverage relative to a year of deworming in Baird`)/100 * adjustedLongTermBenefitsPerYearOfDeworming * pullBackValueFromModel(modelData, `Value assigned to doubling consumption for one person for one year`)/Math.log(2) * (1 - pullBackValueFromModel(modelConstants, `Efficacy reduction due to insecticide resistance`)/100) * combinedAdjustmentForPreExisitingNetsAndAlternativeFunders) / pullBackValueFromModel(modelConstants, `Cost per person year of protection for under 15's`)

		return unitsOfValueFromDevelopmentalBenefitsPerDollar 
	}

	const calculateCostPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividualUnder5 = (totalUnitsOfValue) => {

		// Cost per outcome as good as Averting the Death of an Individual Under 5 = 
		// Value assigned to individual under 5 
		// / Total value 
		const costPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividualUnder5 = pullBackValueFromModel(modelData, `Value assigned to averting the death of an individual under 5 — AMF`) / totalUnitsOfValue
	
		return Math.floor(costPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividualUnder5)
	}

	const calculateCostPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividual5AndOver = (totalUnitsOfValue) => {

		// Cost per outcome as good as Averting the Death of an individual 5 and over = 
		// Value assigned to individual 5 and over
		// / Total value 
		const costPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividual5AndOver = pullBackValueFromModel(modelData, `Value assigned to averting the death of an individual 5 or older — AMF`) / totalUnitsOfValue
	
		return Math.floor(costPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividual5AndOver)
	}

	// Pulled from https://stackoverflow.com/questions/31177169/how-to-calculate-pv-and-fv-formula-in-js 
	const pv = (rate, nper, pmt, fv) => {
	  rate = parseFloat(rate)
	  nper = parseFloat(nper)
	  pmt = parseFloat(pmt)
	  fv = parseFloat(fv) || 0
	  if ( nper == 0 ) {
	    alert("Why do you want to test me with zeros?")
	    return(0)       
	  }
	  let pv_value 
	  if ( rate == 0 ) { // Interest rate is 0
	    pv_value = -(fv + (pmt * nper))
	  } else {
	    let x = Math.pow(1 + rate, -nper) 
	    let y = Math.pow(1 + rate, nper)
	    pv_value = - ( x * ( fv * rate - pmt + y * pmt )) / rate
	  }
	  return pv_value
	}


	// Cost per under-5 death averted
	const {under5DeathsAverted, 
		combinedAdjustmentForPreExisitingNetsAndAlternativeFunders, 
		costPerUnder5DeathAverted} = calculateCostPerUnder5DeathAverted()

	// Cost per age 5+ death averted
	const {costPerAge5PlusDeathAverted, age5plusDeathsAverted} = calculateCostPerAge5PlusDeathAverted(under5DeathsAverted)

	// Units of value from under 5 deaths averted for each dollar donated
	const unitsOfValueFromUnder5DeathsAvertedPerDollar = calcuateUnitOfValueFromUnder5DeathsAvertedPerDollar(costPerUnder5DeathAverted)

	//Units of value from 5 and over deaths averted per dollar donated
	const unitOfValueFrom5AndOverDeathsAvertedPerDollar = calcuateUnitOfValueFrom5AndOverDeathsAvertedPerDollar(costPerAge5PlusDeathAverted)

	// Cost per death averted 
	const costPerDeathAverted = pullBackValueFromModel(modelConstants, `Arbitrary donation size`) / (under5DeathsAverted + age5plusDeathsAverted)

	// Units of value from developmental benefits per dollar donated
	const unitsOfValueFromDevelopmentalBenefitsPerDollar = calculateUnitsOfValueFromDevelopmentalBenefitsPerDollar(combinedAdjustmentForPreExisitingNetsAndAlternativeFunders)


	// Work out the final model costs per outcome as good as ...
	const totalUnitsOfValue = unitsOfValueFromDevelopmentalBenefitsPerDollar + unitOfValueFrom5AndOverDeathsAvertedPerDollar + unitsOfValueFromUnder5DeathsAvertedPerDollar

	const costPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividualUnder5 = calculateCostPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividualUnder5(totalUnitsOfValue)
	
	const costPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividual5AndOver = calculateCostPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividual5AndOver(totalUnitsOfValue)


	return {
		costPerUnder5DeathAverted,
		costPerAge5PlusDeathAverted,
		costPerDeathAverted: Math.floor(costPerDeathAverted),
		unitsOfValueFromUnder5DeathsAvertedPerDollar,
		unitOfValueFrom5AndOverDeathsAvertedPerDollar,
		unitsOfValueFromDevelopmentalBenefitsPerDollar,
		totalUnitsOfValue,
		costPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividualUnder5,
		costPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividual5AndOver
	}
}



