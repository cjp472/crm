package com.ulane.monitor.model.unim;


public final class UnimThrLevlDTO
{

    public UnimThrLevlDTO()
    {
    }

    Long id;
    Long categoryId;
    String name;
    String code;
    String thrLevlAdv;
    String thrLevlWar;
    String agentColor;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getThrLevlAdv() {
		return thrLevlAdv;
	}
	public void setThrLevlAdv(String thrLevlAdv) {
		this.thrLevlAdv = thrLevlAdv;
	}
	public String getThrLevlWar() {
		return thrLevlWar;
	}
	public void setThrLevlWar(String thrLevlWar) {
		this.thrLevlWar = thrLevlWar;
	}
	public String getAgentColor() {
		return agentColor;
	}
	public void setAgentColor(String agentColor) {
		this.agentColor = agentColor;
	}
    
    
}