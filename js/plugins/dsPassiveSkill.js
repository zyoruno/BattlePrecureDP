//=============================================================================
// dsPassiveSkill.js
// Copyright (c) 2016 Douraku
// Released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc パッシブスキルを実装するプラグイン ver1.03
 * @author 道楽
 *
 * @param Show Battle
 * @desc パッシブスキルを戦闘中に表示するか
 * (true なら表示する / false なら表示しない)
 * @default true
 *
 * @help
 * このプラグインは以下のメモタグの設定ができます。
 *
 * -----------------------------------------------------------------------------
 * スキルに設定するメモタグ
 *
 * ・装備できる武器の種類を追加(Equip Weapon)
 * <passiveEWPN[武器タイプ]>
 *  [武器タイプ] - 武器タイプの番号を2桁の数値で設定する。(数字)
 *
 * ・装備できる防具の種類を追加(Equip Armor)
 * <passiveEARM[防具タイプ]>
 *  [防具タイプ] - 防具タイプの番号を2桁の数値で設定する。(数字)
 *
 * ・特定の通常能力値をアップ(Parameter Boost)
 * <passivePBST[能力値番号]:[上昇量(%)]>
 *  [能力値番号] - 上昇させる通常能力値の番号を1桁の数値で設定する。(数字)
 *                 0 - ＨＰ, 1 - ＭＰ, 2 - 攻撃力, 3 - 防御力
 *                 4 - 魔法力, 5 - 魔法防御, 6 - 敏捷性, 7 - 運
 *  [上昇量(%)]  - 能力値の上昇量。
 *                     %なしなら直値、ありなら倍率となる。(数字)
 *                 装備なし状態の能力値に対しての倍率がかかる。
 *
 * ・特定の追加能力値をアップ(XParameter Boost)
 * <passiveXPBST[能力値番号]:[上昇量]>
 *  [能力値番号] - 上昇させる追加能力値の番号を1桁の数値で設定する。(数字)
 *                 0 - 命中率, 1 - 回避率, 2 - 会心率, 3 - 会心回避率
 *                 4 - 魔法回避率, 5 - 魔法反射率, 6 - 反撃率, 7 - ＨＰ再生率
 *                 8 - ＭＰ再生率, 9 - ＴＰ再生率
 *  [上昇量]     - 能力値の上昇量。(数字)
 *
 * ・特定の特殊能力値をアップ(SParameter Boost)
 * <passiveSPBST[能力値番号]:[上昇量]>
 *  [能力値番号] - 上昇させる特殊能力値の番号を1桁の数値で設定する。(数字)
 *                 0 - 狙われ率, 1 - 防御効果率, 2 - 回復効果率, 3 - 薬の知識率
 *                 4 - ＭＰ消費率, 5 - ＴＰチャージ率, 6 - 物理ダメージ率
 *                 7 - 魔法ダメージ率, 8 - 床ダメージ率, 9 - 経験値獲得率
 *  [上昇量]     - 能力値の上昇量。(数字)
 *
 * ・一定のＨＰ以下の場合のみ特定の通常能力値をアップ(Indomitable)
 * <passiveINDM[能力値番号]:[HP残量率],[上昇量(%)]>
 *  [能力値番号] - 上昇させる通常能力値の番号を1桁の数値で設定する。(数字)
 *                 0 - ＨＰ, 1 - ＭＰ, 2 - 攻撃力, 3 - 防御力
 *                 4 - 魔法力, 5 - 魔法防御, 6 - 敏捷性, 7 - 運
 *  [HP残量率]   - 効果が発揮されるHPの残量率を%で設定する。(数字)
 *  [上昇量(%)]  - 能力値の上昇量。
 *                 %なしなら直値、ありなら倍率となる。(数字)
 *                 装備なし状態の能力値に対しての倍率がかかる。
 *
 * ・一定のＨＰ以下の場合のみ特定の追加能力値をアップ(XIndomitable)
 * <passiveXINDM[能力値番号]:[HP残量率],[上昇量]>
 *  [能力値番号] - 上昇させる追加能力値の番号を1桁の数値で設定する。(数字)
 *                 0 - 命中率, 1 - 回避率, 2 - 会心率, 3 - 会心回避率
 *                 4 - 魔法回避率, 5 - 魔法反射率, 6 - 反撃率, 7 - ＨＰ再生率
 *                 8 - ＭＰ再生率, 9 - ＴＰ再生率
 *  [HP残量率]   - 効果が発揮されるHPの残量率を%で設定する。(数字)
 *  [上昇量]     - 能力値の上昇量。(数字)
 *
 * ・一定のＨＰ以下の場合のみ特定の特殊能力値をアップ(SIndomitable)
 * <passiveSINDM[能力値番号]:[HP残量率],[上昇量]>
 *  [能力値番号] - 上昇させる特殊能力値の番号を1桁の数値で設定する。(数字)
 *                 0 - 狙われ率, 1 - 防御効果率, 2 - 回復効果率, 3 - 薬の知識率
 *                 4 - ＭＰ消費率, 5 - ＴＰチャージ率, 6 - 物理ダメージ率
 *                 7 - 魔法ダメージ率, 8 - 床ダメージ率, 9 - 経験値獲得率
 *  [HP残量率]   - 効果が発揮されるHPの残量率を%で設定する。(数字)
 *  [上昇量]     - 能力値の上昇量。(数字)
 *
 * ・属性有効度を設定(Element Rate)
 * <passiveELEM[属性番号]:[倍率]>
 *  [属性番号] - 有効度を設定する属性の番号を2桁の数値で設定する。(数字)
 *  [有効度]   - 有効度を表すパーセンテージ。(数字)
 *               職業等で設定されている属性有効度に乗算して使用されます。
 *
 * ・ステート有効度を設定(State Rate)
 * <passiveSTAT[ステート番号]:[有効度]>
 *  [ステート番号] - 耐性を上昇させるステートの番号を4桁の数値で設定する。(数字)
 *  [有効度]       - 有効度を表すパーセンテージ。(数字)
 *                   職業等で設定されているステート有効度に乗算して使用されます。
 *
 * ・無効化できるステートを追加(State Regist)
 * <passiveSTREG[ステート番号]>
 *  [ステート番号] - 無効化できるステートの番号を4桁の数値で設定する。(数字)
 *
 * ・武器装備時の能力上昇値をアップ(Weapon Mastery)
 * <passiveWPNM[武器タイプ]:[上昇量(%)]>
 *  [武器タイプ] - 武器タイプの番号を2桁の数値で設定する。(数字)
 *  [上昇量(%)]  - 装備時の能力値の上昇量。
 *                 %なしなら直値、ありなら倍率となる。(数字)
 *
 * ・防具装備時の能力上昇値をアップ(Armor Mastery)
 * <passiveARMM[防具タイプ]:[上昇量(%)]>
 *  [防具タイプ] - 防具タイプの番号を2桁の数値で設定する。(数字)
 *  [上昇量(%)]  - 装備時の能力値の上昇量。
 *                 %なしなら直値、ありなら倍率となる。(数字)
 *
 * ・先制攻撃率をアップ(Preemptive)
 * <passivePREE:[上昇量]>
 *  [上昇量] - 先制攻撃率のアップ率を%で設定する。(数字)
 *
 * ・不意打ち率をダウン(Anti Surprise)
 * <passiveASUP:[下降量]>
 *  [下降量] - 不意打ち率のダウン率を%で設定する。(数字)
 */

var Imported = Imported || {};
Imported.dsPassiveSkill = true;

var dsPassiveSkill = {};

(function(ns) {
	'use strict';

	ns.Param = (function() {
		var ret = {};
		var parameters = PluginManager.parameters('dsPassiveSkill');
		ret.ShowBattle = Boolean(parameters['Show Battle'] === 'true' || false);
		return ret;
	})();

	//-------------------------------------------------------------------------
	/** Game_Actor */
	Game_Actor.prototype.iteratePassiveSkill = function(metaName, callback)
	{
		this.skills().forEach(function(skill) {
			if ( skill.meta[metaName] )
			{
				callback(skill.meta[metaName]);
			}
		});
	};

	var _Game_Actor_paramBase = Game_Actor.prototype.paramBase;
	Game_Actor.prototype.paramBaseDirect = function(paramId)
	{
		return _Game_Actor_paramBase.call(this, paramId);
	};

	Game_Actor.prototype.paramBaseBoost = function(paramId)
	{
		var base = this.paramBaseDirect(paramId);
		var ret = base;
		var tagPBST = 'passivePBST' + ('0'+paramId).slice(-1);
		this.iteratePassiveSkill(tagPBST, function(metaData) {
			var re = /(\d+)(%?)/i;
			var match = re.exec(metaData);
			if ( match )
			{
				if ( match[2] === '%' )
				{
					var rate = Number(match[1]) * 0.01;
					ret += Math.floor(ret * rate);
				}
				else
				{
					ret += Number(match[1]);
				}
			}
		});
		var tagINDM = 'passiveINDM' + ('0'+paramId).slice(-1);
		this.iteratePassiveSkill(tagINDM, function(metaData) {
			var re = /(\d+)\,(\d+)(%?)/i;
			var match = re.exec(metaData);
			if ( match )
			{
				if ( this.hpRate() <= Number(match[1]) * 0.01 )
				{
					if ( match[3] === '%' )
					{
						var rate = Number(match[2]) * 0.01;
						ret += Math.floor(ret * rate);
					}
					else
					{
						ret += Number(match[2]);
					}
				}
			}
		}.bind(this));
		return ret - base;
	};

	Game_Actor.prototype.paramBase = function(paramId)
	{
		var ret = this.paramBaseDirect(paramId);
		ret += this.paramBaseBoost(paramId);
		return ret;
	};

	var _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
	Game_Actor.prototype.paramPlusDirect = function(paramId)
	{
		return _Game_Actor_paramPlus.call(this, paramId);
	};

	Game_Actor.prototype.paramPlusBoost = function(paramId)
	{
		var base = this.paramPlusDirect(paramId);
		var ret = base;
		this.equips().forEach(function(item) {
			if ( item )
			{
				if ( DataManager.isWeapon(item) )
				{
					var tag = 'passiveWPNM' + ('0'+item.wtypeId).slice(-2);
					this.iteratePassiveSkill(tag, function(metaData) {
						var re = /(\d+)(%?)/i;
						var match = re.exec(metaData);
						if ( match )
						{
							if ( item.params[paramId] > 0 )
							{
								if ( match[2] === '%' )
								{
									var rate = Number(match[1]) * 0.01;
									ret += Math.floor(item.params[paramId] * rate);
								}
								else
								{
									ret += Number(match[1]);
								}
							}
						}
					}.bind(this));
				}
				else if ( DataManager.isArmor(item) )
				{
					var tag = 'passiveARMM' + ('0'+item.atypeId).slice(-2);
					this.iteratePassiveSkill(tag, function(metaData) {
						var re = /(\d+)(%?)/i;
						var match = re.exec(metaData);
						if ( match )
						{
							if ( item.params[paramId] > 0 )
							{
								if ( match[2] === '%' )
								{
									var rate = Number(match[1]) * 0.01;
									ret += Math.floor(item.params[paramId] * rate);
								}
								else
								{
									ret += Number(match[1]);
								}
							}
						}
					}.bind(this));
				}
			}
		}, this);
		return ret - base;
	};

	Game_Actor.prototype.paramPlus = function(paramId)
	{
		var ret = this.paramPlusDirect(paramId);
		ret += this.paramPlusBoost(paramId);
		return ret;
	};

	var _Game_Actor_xparam = Game_Actor.prototype.xparam;
	Game_Actor.prototype.xparamDirect = function(xparamId)
	{
		return _Game_Actor_xparam.call(this, xparamId);
	};

	Game_Actor.prototype.xparam = function(xparamId)
	{
		var ret = this.xparamDirect(xparamId);
		var tagPBST = 'passiveXPBST' + ('0'+xparamId).slice(-1);
		this.iteratePassiveSkill(tagPBST, function(metaData) {
			var re = /(\d+)/i;
			var match = re.exec(metaData);
			if ( match )
			{
				ret += Number(match[1]) * 0.01;
			}
		});
		var tagINDM = 'passiveXINDM' + ('0'+xparamId).slice(-1);
		this.iteratePassiveSkill(tagINDM, function(metaData) {
			var re = /(\d+)\,(\d+)/i;
			var match = re.exec(metaData);
			if ( match )
			{
				if ( this.hpRate() <= Number(match[1]) * 0.01 )
				{
					ret += Number(match[2]) * 0.01;
				}
			}
		}.bind(this));
		return ret;
	};

	var _Game_Actor_sparam = Game_Actor.prototype.sparam;
	Game_Actor.prototype.sparamDirect = function(sparamId)
	{
		return _Game_Actor_sparam.call(this, sparamId);
	};

	Game_Actor.prototype.sparam = function(sparamId)
	{
		var ret = this.sparamDirect(sparamId);
		var tagPBST = 'passiveSPBST' + ('0'+sparamId).slice(-1);
		this.iteratePassiveSkill(tagPBST, function(metaData) {
			var re = /(\d+)/i;
			var match = re.exec(metaData);
			if ( match )
			{
				ret += Number(match[1]) * 0.01;
			}
		});
		var tagINDM = 'passiveSINDM' + ('0'+sparamId).slice(-1);
		this.iteratePassiveSkill(tagINDM, function(metaData) {
			var re = /(\d+)\,(\d+)/i;
			var match = re.exec(metaData);
			if ( match )
			{
				if ( this.hpRate() <= Number(match[1]) * 0.01 )
				{
					ret += Number(match[2]) * 0.01;
				}
			}
		}.bind(this));
		return ret;
	};

	var _Game_Actor_elementRate = Game_Actor.prototype.elementRate;
	Game_Actor.prototype.elementRate = function(elementId)
	{
		var ret = _Game_Actor_elementRate.call(this, elementId);
		var tag = 'passiveELEM' + ('0'+elementId).slice(-2);
		this.iteratePassiveSkill(tag, function(metaData) {
			var re = /(\d+)/i;
			var match = re.exec(metaData);
			if ( match )
			{
				ret *= Number(match[1]) * 0.01;
			}
		});
		return ret;
	};

	var _Game_Actor_stateRate = Game_Actor.prototype.stateRate;
	Game_Actor.prototype.stateRate = function(stateId)
	{
		var ret = _Game_Actor_stateRate.call(this, stateId);
		var tag = 'passiveSTAT' + ('0000'+stateId).slice(-4);
		this.iteratePassiveSkill(tag, function(metaData) {
			var re = /(\d+)/i;
			var match = re.exec(metaData);
			if ( match )
			{
				ret *= Number(match[1]) * 0.01;
			}
		});
		return ret;
	};

	var _Game_Actor_stateResistSet = Game_Actor.prototype.stateResistSet;
	Game_Actor.prototype.stateResistSet = function()
	{
		var ret = _Game_Actor_stateResistSet.call(this);
		var num = $dataStates.length;
		for ( var ii = 1; ii < num; ii++ )
		{
			var tag = 'passiveSTREG' + ('0000'+ii).slice(-4);
			this.iteratePassiveSkill(tag, function(metaData) {
				if ( !ret.contains(ii) )
				{
					ret.push(ii);
				}
			});
		}
		return ret;
	};

	var _Game_Actor_isEquipWtypeOk = Game_Actor.prototype.isEquipWtypeOk;
	Game_Actor.prototype.isEquipWtypeOk = function(wtypeId)
	{
		var ret = _Game_Actor_isEquipWtypeOk.call(this, wtypeId);
		var tag = 'passiveEWPN' + ('0'+wtypeId).slice(-2);
		this.iteratePassiveSkill(tag, function(metaData) {
			ret = true;
		});
		return ret;
	};

	var _Game_Actor_isEquipAtypeOk = Game_Actor.prototype.isEquipAtypeOk;
	Game_Actor.prototype.isEquipAtypeOk = function(atypeId)
	{
		var ret = _Game_Actor_isEquipAtypeOk.call(this, atypeId);
		var tag = 'passiveEARM' + ('0'+atypeId).slice(-2);
		this.iteratePassiveSkill(tag , function(metaData) {
			ret = true;
		});
		return ret;
	};

	//-------------------------------------------------------------------------
	/** Game_Party */
	var _Game_Party_ratePreemptive = Game_Party.prototype.ratePreemptive;
	Game_Party.prototype.ratePreemptive = function(troopAgi)
	{
		var rate = _Game_Party_ratePreemptive.call(this, troopAgi);
		this.battleMembers().some(function(actor) {
			actor.iteratePassiveSkill('passivePREE', function(metaData) {
				rate += Number(metaData) * 0.01;
			});
		});
		return rate.clamp(0.0, 1.0);
	};

	var _Game_Party_rateSurprise = Game_Party.prototype.rateSurprise;
	Game_Party.prototype.rateSurprise = function(troopAgi)
	{
		var rate = _Game_Party_rateSurprise.call(this, troopAgi);
		this.battleMembers().some(function(actor) {
			actor.iteratePassiveSkill('passiveASUP', function(metaData) {
				rate -= Number(metaData) * 0.01 * rate;
			});
		});
		return rate.clamp(0.0, 1.0);
	};

	//-------------------------------------------------------------------------
	/** Window_BattleSkill */
	var _Window_BattleSkill_includes = Window_BattleSkill.prototype.includes;
	Window_BattleSkill.prototype.includes = function(item)
	{
		if ( !ns.Param.ShowBattle )
		{
			if ( item )
			{
				var re = /<passive/;
				if ( re.test(item.note) )
				{
					return false;
				}
			}
		}
		return _Window_BattleSkill_includes.call(this, item);
	};

})(dsPassiveSkill);

